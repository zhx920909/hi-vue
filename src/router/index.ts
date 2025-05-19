import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home.vue'),
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/components/User.vue'),
        },
    ],
})

export default router

export function setupRouter(app: App) {
    app.use(router)
}
