import { AppProps } from "@/types/app";

export const apps: AppProps[] = [
    {
        id: 1,
        label: '回收站',
        icon: 'icon-huishouzhan',
        onClick: console.log
    },
    {
        id: 2,
        icon: 'icon-vscode',
        label: 'Edge',
        onClick: console.log
    },
    {
        id: 3,
        icon: 'icon-a-MicrosoftEdge',
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