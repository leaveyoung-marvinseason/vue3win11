export interface AppProps {
    id: number;
    name: string; // 组件名称
    label: string;
    icon: string;
    onClick?: (e: Event) => void;
}