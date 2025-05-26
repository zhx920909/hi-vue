/**
 * 路由守卫
 * 提供路由导航守卫逻辑，用于保护需要认证的路由
 */

import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { authService } from './auth.service'

/**
 * 认证守卫
 * 检查用户是否有权限访问需要认证的路由
 */
export function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void {
    // 检查路由是否需要认证
    if (to.meta.requiresAuth) {
        // 检查用户是否已登录
        if (authService.isAuthenticated()) {
            // 已登录，允许访问
            next()
        } else {
            // 未登录，重定向到登录页面，并保存原目标路由
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            })
        }
    } else {
        // 不需要认证的路由，直接访问
        next()
    }
}

/**
 * 角色守卫
 * 检查用户是否具有访问特定路由所需的角色
 * @param roles 允许访问的角色列表
 */
export function roleGuard(roles: string[]) {
    return (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ): void => {
        // 首先确保用户已认证
        if (!authService.isAuthenticated()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            })
            return
        }

        // 这里可以实现基于角色的访问控制
        // 例如，从用户信息中获取角色并检查是否有权限
        const user = authService.getCurrentUser()
        // 假设用户对象有roles属性
        if (
            user &&
            user.roles &&
            user.roles.some((role: string) => roles.includes(role))
        ) {
            next()
        } else {
            next({ path: '/unauthorized' })
        }

        // 简化版本，暂时允许所有已认证用户访问
        next()
    }
}

/**
 * 已登录用户守卫
 * 防止已登录用户访问登录页等不需要重复访问的页面
 */
export function loggedInGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void {
    // 如果用户已登录且尝试访问登录页
    if (authService.isAuthenticated() && to.meta.guestOnly) {
        // 重定向到首页或上一页
        next(from.path !== '/' && from.path !== '/login' ? from.path : '/')
    } else {
        next()
    }
}
