import { RouteRecordRaw } from 'vue-router'
import Index from "@/pages/index/index.vue";
import Login from "@/pages/login/index.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/index', component: Index },
    { path: '/home', component: () => import('@/pages/home/index.vue') },
]
export default routes