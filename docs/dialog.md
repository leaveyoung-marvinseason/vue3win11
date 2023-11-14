# dialog管理方案-1

## store in `pinia`
```javascript
const { 
  dialogs,
  updateDialog, 
  deleteDialog, 
  addDialog, 
  hideDialog, 
  showDialog,
  focusDialog
}  = useDialogStore();

```
## use

显示
```vue
<dialog v-if="!dialog.hide" v-for="dialog in dialogs" key="dialog.id"></dialog>
```
点击app，弹窗
```javascript
app.onclick = () => {
  addDialog(
    {
      id: Date.now(),
      zIndex: 0,
      app
    }
  )
}
```

dialog操作
```javascript
dialog.onclose = () => {
  deleteDialog({id: 1})
}

dialog.onclick = () => {
  focusDialog({id: 1});
}

dialog.onhide = () => {
  hideDialog({id: 1});
}

dialog.onshow = () => {
  hideDialog({id: 1});
}

```

## notice
`onhide`
维护一个链表，记录dialog的点击次序，隐藏一个之后自动focus表头的一个dialog，链表使用头插法新增