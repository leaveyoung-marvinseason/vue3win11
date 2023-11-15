import { DialogNode } from "@/class/DialogLinkedList.ts";
import { ID_TYPE } from "@/types";
import { DialogProps } from "@/types/dialog.ts";

export interface IDialogList {

  add(dialog: DialogNode): void;

  isExist(id: ID_TYPE): boolean;

  peek(id: ID_TYPE): DialogProps | null;

  remove(id: ID_TYPE): DialogProps | null;

  focusDialog(dialog?: DialogProps): boolean;

  toList(): DialogProps[];

  getHideList(): DialogProps[];

  getUnHideList(): DialogProps[];
}
