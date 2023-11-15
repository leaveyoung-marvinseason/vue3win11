import { AppProps } from "@/types/app.ts";
import { ID_TYPE } from "@/types/index.ts";

export interface DialogProps {
  id: ID_TYPE;
  hide?: boolean;
  zIndex?: number;
  app?: AppProps;
  // 弹窗位置大小
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

