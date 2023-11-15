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

  peek(id?: ID_TYPE) {
    let header = this.headerNode;
    while (header.next) {
      if (header.next.id == id) {
        return {
          target: header.next,
          pointer: header
        };
      }
      header = header.next;
    }

    return {
      target: null,
      pointer: header
    };
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

  adjustSpecTarget(pointer: DialogNode, target: DialogNode) {
    const header = this.headerNode;
    pointer.next = target.next;
    target.next = header.next;
    header.next = target;
  }


  focusAuto() {
    let header = this.headerNode;
    let isReset = false;
    while (header.next) {
      if (!isReset) {
        header.next.zIndex = FOCUS_DIALOG_Z_INDEX;
        isReset = true;
      } else {
        header.next.zIndex = UN_FOCUS_DIALOG_Z_INDEX;
      }
      header = header.next;
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
}
