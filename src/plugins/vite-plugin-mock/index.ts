import { viteMockServe } from 'vite-plugin-mock'

const vitePluginMockPlugin = [
    viteMockServe({
        // default
        mockPath: 'mock',
        enable: true,
    }),
]

export default vitePluginMockPlugin
