import { AppProps } from "@/types/app.ts";

export interface DialogProps {
  id: string | number;
  hide: boolean;
  zIndex?: number;
  app: AppProps;
  // 弹窗位置大小
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

export type DialogNodeType = Pick<DialogProps, "id"> & {
  next: DialogNodeType | null;
}
