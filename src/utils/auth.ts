import { TOKEN } from "@/constants"

export const login = ({ username, password }: { username: string, password: string }) => {
    console.log('login ... ...');
    sessionStorage.setItem(TOKEN, username.concat(password))
}

export const logout = () => {
    console.log('logout ... ...');
    sessionStorage.removeItem(TOKEN)
}

export const isLogin = () => {
    return sessionStorage.getItem(TOKEN)
}