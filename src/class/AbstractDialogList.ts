import { IDialogList } from "@/class/IDialogList.ts";
import { DialogProps, DialogNode } from "@/types/dialog.ts";
import { ID_TYPE } from "@/types";

export abstract class AbstractDialogList implements IDialogList {
  toList(): DialogProps[] {
    return [];
  }

  getHideList() {
    return this.toList().filter(item => item.hide);
  }

  getUnHideList() {
    return this.toList().filter(item => !item.hide);
  }

  add(dialog: DialogNode): void {
  }

  focusDialog(dialog?: DialogProps): boolean {
    return false;
  }

  isExist(id: ID_TYPE): boolean {
    return false;
  }

  peek(id: ID_TYPE): DialogProps | null {
    return null;
  }

  remove(id: ID_TYPE): DialogProps | null {
    return null;
  }
}
