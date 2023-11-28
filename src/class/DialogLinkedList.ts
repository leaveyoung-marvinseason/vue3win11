import { ID_TYPE } from "@/types";
import { FOCUS_DIALOG_Z_INDEX, UN_FOCUS_DIALOG_Z_INDEX } from "@/constants";
import { DialogProps, DialogNode } from "@/types/dialog.ts";
import { AbstractDialogList } from "@/class/AbstractDialogList.ts";
import { toRaw } from "vue";

export class DialogLinkedList extends AbstractDialogList {
  private readonly dialogSet: Set<ID_TYPE>;
  private readonly headerNode: DialogNode;

  constructor() {
    super();
    this.headerNode = {
      id: -1,
      next: null,
    };
    this.dialogSet = new Set();
  }

  add(dialog: DialogNode) {
    const header = this.headerNode;
    dialog.next = header.next;
    header.next = dialog;

    this.dialogSet.add(dialog.id);
  }

  isExist(id: ID_TYPE) {
    return this.dialogSet.has(id);
  }

  peek(id: ID_TYPE) {
    let header = this.headerNode;
    while (header.next) {
      if (header.next.id == id) {
        return header.next;
      }
      header = header.next;
    }

    return null;
  }

  remove(id: ID_TYPE) {
    let header = this.headerNode;

    while (header.next) {
      if (header.next.id == id) {
        const deleted = header.next;
        header.next = deleted.next;
        this.dialogSet.delete(id);
        return deleted;
      }
      header = header.next;
    }
    return null;
  }

  focusDialog(dialog?: DialogProps) {
    return this.focusAuto(dialog ?? this.headerNode.next);
  }

  private focusAuto(dialog: DialogProps | null | undefined) {
    if (!dialog) {
      return false;
    }

    try {
      let header = this.headerNode;
      // reset index,
      while (header.next) {
        if (header.next.zIndex == FOCUS_DIALOG_Z_INDEX) {
          header.next.zIndex = UN_FOCUS_DIALOG_Z_INDEX;
          break
        }

        header = header.next;
      }

      header = this.headerNode;
      while (header.next) {
        if (header.next.id === dialog.id) {
          //
          let target = header.next;
          header.next = target.next;
          target.next = this.headerNode.next;
          this.headerNode.next = target;
          break;
        }
        header = header.next;
      }

      header = this.headerNode;
      if (header.next) {
        header.next.zIndex = FOCUS_DIALOG_Z_INDEX;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  toList() {
    const nodeList: DialogProps[] = [];
    let header = this.headerNode;

    while (header.next) {
      const { id, zIndex, hide, left, top, app } = header.next;
      nodeList.push({
        id,
        zIndex,
        hide,
        left,
        top,
        app: toRaw(app),
      });

      header = header.next;
    }
    return nodeList;
  }
}
