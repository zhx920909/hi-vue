<template>
    <div class="login-container">
        <div class="login-form">
            <h1>登录</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="username">用户名：</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        required
                        placeholder="请输入用户名"
                    />
                </div>
                <div class="form-group">
                    <label for="password">密码：</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        required
                        placeholder="请输入密码"
                    />
                </div>
                <div class="form-actions">
                    <button type="submit" :disabled="isLoading">
                        {{ isLoading ? '登录中...' : '登录' }}
                    </button>
                </div>
                <div v-if="error" class="error-message">
                    {{ error }}
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

export default defineComponent({
    name: 'LoginView',
    setup() {
        const username = ref('')
        const password = ref('')
        const error = ref('')
        const isLoading = ref(false)
        const router = useRouter()
        const route = useRoute()
        const authStore = useAuthStore()

        const handleLogin = async () => {
            error.value = ''
            isLoading.value = true

            try {
                // 这里应该是实际的登录API调用
                // 模拟登录成功
                await new Promise((resolve) => setTimeout(resolve, 1000)) // 模拟网络请求

                const token = 'mock_token_' + Date.now()
                const user = {
                    id: '1',
                    name: username.value,
                }

                // 使用Pinia存储登录状态
                authStore.login(token, user)

                // 重定向到原目标路由或首页
                const redirectPath = (route.query.redirect as string) || '/'
                router.push(redirectPath)
            } catch (err) {
                console.error('登录失败', err)
                error.value = '用户名或密码错误，请重试'
            } finally {
                isLoading.value = false
            }
        }

        return {
            username,
            password,
            error,
            isLoading,
            handleLogin,
        }
    },
})
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.login-form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-actions {
    margin-top: 2rem;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.error-message {
    margin-top: 1rem;
    color: #f44336;
    text-align: center;
}
</style>
