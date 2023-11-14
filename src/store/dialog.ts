import { defineStore } from "pinia";
import { ref } from "vue";
import { DialogNodeType, DialogProps } from "@/types/dialog.ts";
import { FOCUS_DIALOG_Z_INDEX, UN_FOCUS_DIALOG_Z_INDEX } from "@/constants";

export const useDialogStore = defineStore("dialog", () => {
  // all dialogs
  const dialogs = ref<DialogProps[]>([]);
  // dialog list by click order
  const dialogListHead: DialogNodeType = {
    id: -1,
    hide: true,
    next: null
  };
  const addDialog = (dialog: DialogProps) => {
    const targetIndex = dialogs.value?.findIndex(item => item.id == dialog.id);


    if (targetIndex < 0) {
      dialogs.value?.push(dialog);
    }

    dialogs.value.forEach(item => {
      if (item.id == dialog.id) {
        item.zIndex = FOCUS_DIALOG_Z_INDEX;
      } else {
        item.zIndex = UN_FOCUS_DIALOG_Z_INDEX;
      }
    });

    focusDialog(dialog);

  };
  const updateDialog = ({ id }: DialogProps) => {
  };
  const deleteDialog = ({ id }: DialogProps) => {
  };
  const hideDialog = ({ id }: DialogProps) => {
  };

  function findExistDialogById(id: number | string) {
    let pointer = dialogListHead;
    while (pointer.next) {
      if (pointer.next.id == id) {
        return { pointer, target: pointer.next };
      }
      pointer = pointer.next;
    }
    return {
      pointer, target: pointer.next
    };
  }

  const focusDialog = ({ id }: DialogProps) => {
    console.log("focus", id);

    // find existed dialog in list
    const { pointer: preTarget, target } = findExistDialogById(id);

    // if (dialogListHead.next) {
    //   dialogListHead.next.zIndex = UN_FOCUS_DIALOG_Z_INDEX;
    // }

    if (!target) {
      dialogListHead.next = {
        id,
        hide: false,
        // zIndex: FOCUS_DIALOG_Z_INDEX,
        next: dialogListHead.next
      };
    } else {
      // target.zIndex = FOCUS_DIALOG_Z_INDEX;

      preTarget.next = target.next;
      target.next = dialogListHead.next;
      dialogListHead.next = target;

    }

    console.log("dialogListHead", dialogListHead);
  };
  const showDialog = ({ id }: DialogProps) => {
  };

  return {
    dialogs,
    updateDialog,
    deleteDialog,
    addDialog,
    hideDialog,
    showDialog,
    focusDialog
  };

});