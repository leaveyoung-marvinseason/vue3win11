import { RouteRecordRaw } from 'vue-router'
import Index from "@/pages/index/index.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: async () => import('@/pages/login/index.vue') },
    { path: '/index', component: Index },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
]
export default routes