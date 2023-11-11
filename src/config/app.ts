import { AppProps } from "@/types/app";

export const apps: AppProps[] = [
    {
        id: 1,
        label: '回收站',
        icon: 'bin0',
        onClick: console.log
    },
    {
        id: 2,
        icon: 'edge',
        label: 'Edge',
        onClick: console.log
    },
    {
        id: 3,
        icon: 'code',
        label: 'Visual Studio Code',
        onClick: console.log
    },
]

export const barApps: AppProps[] = [
    {
        id: 1,
        label: '',
        icon: 'store',
    },
    {
        id: 2,
        label: '',
        icon: 'explorer',
    },
] 