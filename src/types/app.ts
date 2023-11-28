import { AppAction } from "@/types/index.ts";

export interface AppProps {
    id: number;
    name: string; // 组件名称
    label: string;
    icon: string;
    onClick?: (e: Event) => void;
    action?: AppAction
}

export type BarAppProps = AppProps