/**
 * 认证相关类型定义
 */

// 扩展 Vue Router 的 RouteMeta 接口，添加认证相关的元数据
import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        // 是否需要认证才能访问
        requiresAuth?: boolean
        // 是否只允许未登录用户访问（如登录页）
        guestOnly?: boolean
        // 允许访问的角色列表
        roles?: string[]
        // 页面标题
        title?: string
    }
}

// 登录请求参数
export interface LoginRequest {
    username: string
    password: string
}

// 登录响应数据
export interface LoginResponse {
    token: string
    user: {
        id: string
        name: string
        [key: string]: any // 其他可能的用户属性
    }
}

// 认证状态
export interface AuthState {
    user: any | null
    token: string | null
    isAuthenticated: boolean
}
