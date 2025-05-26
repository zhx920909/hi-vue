import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'

import { authGuard, loggedInGuard } from '../auth/guards'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
            meta: {
                requiresAuth: true, // 需要认证
                title: '首页',
            },
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                requiresAuth: true, // 需要认证
                title: '关于',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                requiresAuth: false, // 不需要认证
                guestOnly: true, // 仅允许未登录用户访问
                title: '登录',
            },
        },
        {
            // 捕获所有未匹配的路由
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/HomeView.vue'), // 可以替换为实际的 404 页面
            meta: {
                requiresAuth: false,
                title: '页面未找到',
            },
        },
    ],
})

// 注册全局前置守卫
router.beforeEach(authGuard) // 认证守卫
router.beforeEach(loggedInGuard) // 已登录用户守卫

// 设置页面标题
router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} - 我的应用` : '我的应用'
})

export default router

export function setupRouter(app: App) {
    app.use(router)
}
