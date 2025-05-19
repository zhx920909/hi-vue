# hi-vue

> 1. Vue Router 和 Pinia 可以在创建 Vue 应用时一并安装，因为 Vue Router 和 Pinia 都需要通过 `createXXX()` 创建实例并使用 `app.use(xxx)` 注册插件，所有这两个插件通过相同的方式进行注册，即 `setupXXX(app)`
> 2. element-plus、tailwindcss、vite-plugin-mock 这三个插件都需要配置 Vite plugin，即 `vite.config.ts` 的 `plugins` 选项，所以放在 `plugins` 目录下采用相同的方式进行注册，并统一管理
> 3. axios 归为工具类，所以放在 `utils` 目录下，并统一管理

## Vite

```bash
pnpm create vite
```

### Usage

1. 在 `src` 目录下新建 `.env` 文件，用于管理环境变量

```env
VITE_BASE_URL = 'http://localhost:5173'
```

2. 在 `src` 目录下新建 `vite-env.d.ts` 文件，用于提供类型定义

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
```

## Vue

```bash
pnpm create vue@latest
```

## pnpm

```bash
pnpm install
pnpm add
pnpm dev
pnpm build
```

## Vue Router

### installation

```bash
pnpm add vue-router@4
```

### Usage

1. 在 `src` 目录下新建 `router` 文件夹，在 `router` 目录下新建 `index.ts` 文件

2. 在 `index.ts` 中创建路由器实例

```ts
const router = createRouter({
    // ...
})

// 方式1：直接导出路由器实例
export default router

// 方式2：导出注册函数
export function setupRouter(app: App) {
    app.use(router)
}
```

3. 在 `main.ts` 中注册路由器插件

```ts
// 方式1：导入路由器实例并注册
import router from './router'
app.use(router)

// 方式2：导入注册函数并调用
import { setupRouter } from './router'
setupRouter(app)
```

## Pinia

### installation

```bash
pnpm add pinia
```

### Usage

1. 方式 1：在 `main.ts` 中创建一个 `pinia` 实例（根 store）并将其传递给应用

```ts
import { createPinia } from 'pinia'
app.use(createPinia())
```

2. 方式 2：在 `src` 目录下新建 `stores` 文件夹，在 `stores` 目录下新建 `index.ts` 文件

3. 在 `index.ts` 中创建 `Pinia` 实例，并导出注册函数

```ts
const store = createPinia()

export function setupStore(app: App) {
    app.use(store)
}
```

4. 在 `main.ts` 中导入注册函数并调用

```ts
import { setupStore } from './stores'
setupStore(app)
```

## axios

### installation

```bash
pnpm add axios
```

### Usage

1. 在 `src` 目录下新建 `utils` 文件夹，在 `utils` 目录下新建 `axios` 文件夹，在 `axios` 目录下新建 `Axios.ts` 类文件，导出 `Axios` 类

2. 在 `axios` 目录下新建 `index.ts` 类文件，导入 `Axios` 类新建一个 `Axios` 实例

```ts
import type { AxiosRequestConfig } from 'axios'
import Axios from './Axios'

const config: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
}

const axiosUtil = new Axios(config)

export default axiosUtil
```

3. 在 `utils` 目录下新建 `index.ts`，统一管理 `utils` 目录下的所有工具类

```ts
import axiosUtil from './axios/index'

const util = { axiosUtil }

export default util
```

## Element Plus

### installation

```bash
pnpm install element-plus

pnpm add -D unplugin-vue-components unplugin-auto-import
```

### Usage

1. 在 `src` 目录下新建 `plugins` 文件夹，在 `plugins` 目录下新建 `element-plus` 文件夹，在 `element-plus` 目录下新建 `index.ts` 文件，导出 `vite.config.ts` 的 `plugins` 选项

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const elementPlusPlugin = [
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
]

export default elementPlusPlugin
```

## Tailwind CSS

### installation

```bash
pnpm add tailwindcss @tailwindcss/vite
```

### Usage

1. 在 `plugins` 目录下新建 `tailwindcss` 文件夹，在 `tailwindcss` 目录下新建 `index.ts` 文件，导出 `vite.config.ts` 的 `plugins` 选项

```ts
import tailwindcss from '@tailwindcss/vite'

const tailwindcssPlugin = [tailwindcss()]

export default tailwindcssPlugin
```

2. 在 `tailwindcss` 目录下新建 `index.css` 文件，导入 `Tailwind CSS`

```css
@import 'tailwindcss';
```

3. 在 `main.ts` 中导入 `index.css`

```ts
import './plugins/tailwindcss/index.css'
```

## vite-plugin-mock

### installation

```bash
pnpm add mockjs

pnpm add vite-plugin-mock -D
```

### Usage

1. 在 `plugins` 目录下新建 `vite-plugin-mock` 文件夹，在 `vite-plugin-mock` 目录下新建 `index.ts` 文件，导出 `vite.config.ts` 的 `plugins` 选项

```ts
import { viteMockServe } from 'vite-plugin-mock'

const vitePluginMockPlugin = [
    viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
    }),
]

export default vitePluginMockPlugin
```

2. 在 `plugins` 目录下新建 `index.ts`，统一管理 `plugins` 目录下的所有插件

```ts
import tailwindcssPlugin from './tailwindcss/index'
import elementPlusPlugin from './element-plus/index'
import vitePluginMockPlugin from './vite-plugin-mock/index'

export function setupPlugins() {
    return [...tailwindcssPlugin, ...elementPlusPlugin, ...vitePluginMockPlugin]
}
```

### Example

1. 在根目录下新建 `mock` 文件夹，在 `mock` 目录下新建文件用于 `mock` 后端 `API` 提供的数据，如新建 `user.ts` 文件，用于 `mock` 用户数据

```ts
import type { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: '/api/getUser',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: {
                    name: 'Jackie',
                },
            }
        },
    },
] as MockMethod[]
```

2. 在 `src` 目录下新建 `apis` 文件夹，用于统一管理 `api`，如新建 `testGetUser.ts` 用于测试获取用户数据的接口

```ts
import util from '../utils/index'

const http = util.axiosUtil

export function getUser() {
    return http.request({
        url: '/api/getUser',
        method: 'get',
    })
}
```

3. 在任一 `.ts` 文件中调用函数即可

```ts
import { getUser } from '@/apis/testGetUser.ts'
getUser()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
```
