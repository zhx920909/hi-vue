import tailwindcssPlugin from './tailwindcss/index'
import elementPlusPlugin from './element-plus/index'
import vitePluginMockPlugin from './vite-plugin-mock/index'

export function setupPlugins() {
    return [...tailwindcssPlugin, ...elementPlusPlugin, ...vitePluginMockPlugin]
}
