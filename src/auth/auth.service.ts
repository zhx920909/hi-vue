/**
 * 认证服务
 * 负责管理用户的登录状态、令牌和用户信息
 */

export interface User {
    id: string
    name: string
    [key: string]: any // 其他用户信息可以根据需要扩展
}

export class AuthService {
    /**
     * 检查用户是否已登录
     * @returns 用户是否已认证
     */
    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token')
    }

    /**
     * 获取当前登录用户信息
     * @returns 用户信息或null（如果未登录）
     */
    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    }

    /**
     * 获取认证令牌
     * @returns 认证令牌或null（如果未登录）
     */
    getToken(): string | null {
        return localStorage.getItem('auth_token')
    }

    /**
     * 登录方法
     * @param token 认证令牌
     * @param user 用户信息
     */
    login(token: string, user: User): void {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    /**
     * 登出方法
     */
    logout(): void {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
    }
}

// 创建单例实例
export const authService = new AuthService()
