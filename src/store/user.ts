import { TOKEN } from '@/constants';
import { getToken } from '@/utils/session';
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAuthStore = defineStore('auth', () => {
    const token = getToken();
    const isLogin = ref(!!token);
    const login = async () => {
        isLogin.value = true
        sessionStorage.setItem(TOKEN, 'token==')
        return Promise.resolve(true)
    }

    const logout = async () => {
        isLogin.value = false
        sessionStorage.removeItem(TOKEN)
        return Promise.resolve(true)
    }

    return {
        isLogin,
        login,
        logout,
    }
})