import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { DialogProps } from "@/types/dialog.ts";
import { UN_FOCUS_DIALOG_Z_INDEX } from "@/constants";
import { DialogLinkedList } from "@/class/DialogLinkedList.ts";
import { IDialogList } from "@/class/IDialogList.ts";


export const useDialogStore = defineStore("dialog", () => {
  // dialog list by click order
  const dialogMaintainer = ref<IDialogList>(new DialogLinkedList());

  const dialogs = computed(() => {
    return dialogMaintainer.value.getUnHideList();
  });

  const hideDialogs = computed(() => {
    return dialogMaintainer.value.getHideList();
  });

  const openDialog = (dialog: DialogProps) => {
    const isExist = dialogMaintainer.value.isExist(dialog.id);

    if (!isExist) {
      dialogMaintainer.value.add({
        ...dialog,
        next: null
      });
    }
    return showDialog(dialog) && focusDialog(dialog);
  };

  const closeDialog = (dialog: DialogProps) => {
    const isExist = dialogMaintainer.value.isExist(dialog.id);
    if (!isExist) {
      alert(`弹窗${dialog.id}关闭失败`);
      return false;
    }
    return dialogMaintainer.value.remove(dialog.id) && focusDialog();
  };

  const clickDialog = (dialog: DialogProps) => {
    return focusDialog(dialog);
  };
  /**
   * 导致聚焦的因素: 打开弹窗、点击弹窗、关闭其他弹窗（自动聚焦一个弹窗）
   * @param dialog
   */
  const focusDialog = (dialog?: DialogProps) => {
    console.log("focus", dialog);
    return dialogMaintainer.value.focusDialog(dialog);
  };
  const showDialog = (dialog: DialogProps) => {
    const target = dialogMaintainer.value.peek(dialog.id);
    if (target) {
      target.hide = false;
      return true;
    }
    return false;
  };


  const updateDialog = (dialog: DialogProps) => {
    const target = dialogMaintainer.value.peek(dialog.id);
    if (target) {
      target.left = dialog.left
      target.top = dialog.top
      return true
    }
    return false
  };
  const hideDialog = (dialog: DialogProps) => {
    const target = dialogMaintainer.value.peek(dialog.id);
    if (target) {
      target.hide = true;
      return true;
    }
    return false;
  };


  return {
    dialogs,
    updateDialog,
    closeDialog,
    openDialog,
    addDialog: openDialog,
    hideDialog,
    showDialog,
    clickDialog
  };

});