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
