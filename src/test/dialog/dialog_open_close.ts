import { useDialogStore } from "@/store/dialog.ts";


export function test() {
  const dialogStore = useDialogStore();
  dialogStore.openDialog({
    id: 1
  });
  dialogStore.openDialog({
    id: 2
  });
  dialogStore.openDialog({
    id: 3
  });

// dialogStore.focusDialog({ id: 2 });
//   dialogStore.closeDialog({
//     id: 1
//   });
  console.log(dialogStore.dialogs);
}