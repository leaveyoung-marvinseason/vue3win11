import { RouteRecordRaw } from 'vue-router'
import Index from "@/pages/index/index.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
]
export default routes