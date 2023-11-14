import { AppProps } from "@/types/app.ts";

export interface DialogProps {
  id: string | number;
  hide: boolean;
  zIndex?: number;
  app: AppProps;
}

export type DialogNodeType = Omit<DialogProps, "app"> & {
  next: DialogNodeType | null;
}
