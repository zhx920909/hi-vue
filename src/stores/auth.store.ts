/**
 * 认证状态管理
 * 使用 Pinia 管理用户认证状态
 */

import { defineStore } from 'pinia'
import { authService, type User } from '../auth/auth.service'
import type { AuthState } from '../auth/types'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),

    getters: {
        // 获取当前用户
        currentUser: (state) => state.user,

        // 检查用户是否已认证
        userIsAuthenticated: (state) => state.isAuthenticated,

        // 获取认证令牌
        authToken: (state) => state.token,
    },

    actions: {
        /**
         * 初始化认证状态
         * 从本地存储加载用户信息和令牌
         */
        initAuth() {
            this.token = authService.getToken()
            this.user = authService.getCurrentUser()
            this.isAuthenticated = !!this.token
        },

        /**
         * 登录操作
         * @param token 认证令牌
         * @param user 用户信息
         */
        login(token: string, user: User) {
            // 更新本地存储
            authService.login(token, user)

            // 更新状态
            this.token = token
            this.user = user
            this.isAuthenticated = true
        },

        /**
         * 登出操作
         */
        logout() {
            // 清除本地存储
            authService.logout()

            // 重置状态
            this.token = null
            this.user = null
            this.isAuthenticated = false
        },

        /**
         * 更新用户信息
         * @param user 新的用户信息
         */
        updateUser(user: User) {
            this.user = user
            // 更新本地存储中的用户信息
            if (this.token) {
                authService.login(this.token, user)
            }
        },
    },
})
