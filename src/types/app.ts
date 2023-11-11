export interface AppProps {
    id: number;
    label: string;
    icon: string;
    onClick?: (e: Event) => void;
}