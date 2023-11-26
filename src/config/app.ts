import { AppProps, BarAppProps } from "@/types/app";
import { AppAction } from "@/types";

export const apps: AppProps[] = [
  {
    id: 1,
    label: "回收站",
    icon: "icon-huishouzhan",
    name: "bin",
    onClick: console.log,
  },
  {
    id: 2,
    icon: "icon-vscode",
    label: "vscode",
    name: "vscode",
    onClick: console.log,
  },
  {
    id: 3,
    icon: "icon-a-MicrosoftEdge",
    name: "edge",
    label: "edge",
    onClick: console.log,
  },
];

export const barApps: AppProps[] = [
  {
    action: AppAction.A1,
    id: 1,
    label: "",
    name: "ai",
    icon: "icon-AI",
  },
  {
    id: 2,
    label: "",
    name: "wenchat",
    icon: "icon-WeChat",
  },
  {
    id: 2,
    label: "",
    name: "terminal",
    icon: "icon-Terminal",
  },
];
