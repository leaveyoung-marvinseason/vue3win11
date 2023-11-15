import { ID_TYPE } from "@/types";
import { FOCUS_DIALOG_Z_INDEX, UN_FOCUS_DIALOG_Z_INDEX } from "@/constants";
import { DialogProps } from "@/types/dialog.ts";

export class DialogNode implements DialogProps {

  constructor(public id: ID_TYPE, public next?: DialogNode | null, public zIndex?: number, public hide?: boolean, public left?: number, public top?: number) {
  }
}

export class DialogLinkedList {
  private readonly dialogSet: Set<ID_TYPE>;
  private readonly headerNode: DialogNode;

  constructor() {
    this.headerNode = new DialogNode(-1, null, -1, false);
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
    this.focusAuto(dialog ?? this.headerNode.next);
  }

  private focusAuto(dialog: DialogProps | null | undefined) {
    if (!dialog) {
      return;
    }

    let header = this.headerNode;
    // reset index,
    while (header.next) {
      header.next.zIndex == FOCUS_DIALOG_Z_INDEX && (header.next.zIndex = UN_FOCUS_DIALOG_Z_INDEX);
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

  }

  toList() {
    const nodeList: DialogProps[] = [];
    let header = this.headerNode;

    while (header.next) {
      const { id, zIndex, hide, left, top } = header.next;
      nodeList.push({
        id, zIndex, hide, left, top
      });

      header = header.next;
    }
    return nodeList;
  }

  getHideList() {
    return this.toList().filter(item => item.hide);
  }

  getUnHideList(){
    return this.toList().filter(item => !item.hide);
  }
}
