import { AppProps } from "@/types/app";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('appStore', () => {
    const selectedApp = ref<AppProps | null>(null);
    const setSelectedApp = (app: AppProps | null) => {
        selectedApp.value = app;
    }

    return {
        selectedApp,
        setSelectedApp
    }
})