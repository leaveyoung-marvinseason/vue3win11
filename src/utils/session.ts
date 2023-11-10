import { TOKEN } from "@/constants"

export const getToken = () => {
    return sessionStorage.getItem(TOKEN)
}