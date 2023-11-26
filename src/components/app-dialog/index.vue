<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import {DialogProps} from "@/types/dialog.ts";
import {nextTick, onMounted, reactive, ref, Ref, toRaw, unref} from "vue";
import {useDialogStore} from "@/store/dialog.ts";
const { updateDialog } = useDialogStore();
import {NButtonGroup, NButton} from "naive-ui";
import icon from '@/components/icon/index.vue'

const {dialog} = defineProps<{
  dialog: DialogProps
}>();

const emit = defineEmits<{
  click: [DialogProps],
  close: [DialogProps],
  hide: [DialogProps]
}>();

const handleClose = (dialog: DialogProps) => {
  emit("close", toRaw(dialog));
};

const handleClick = (dialog: DialogProps) => {
  emit("click", toRaw(dialog));
};
const handleHide = (dialog: DialogProps) => {
  emit("hide", toRaw(dialog));
};


const isDragging = ref(false)
//鼠标点下时的位置
const offsetX = ref(0)
const offsetY = ref(0)
const dialogBox = ref(null)
// 鼠标按下时开始拖拽
const startDrag = (event: any) => {
  isDragging.value = true;
  offsetX.value = event.clientX - dialog.left;
  offsetY.value = event.clientY - dialog.top;

  // 添加mousemove和mouseup事件监听
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

// 鼠标移动时拖拽元素
const handleDrag = (event: any) => {
  if (isDragging && unref(dialogBox)) {
    dialog.left = event.clientX - unref(offsetX);
    dialog.top = event.clientY - unref(offsetY);

    // 限制元素不超出可视区域
    const maxX = window.innerWidth - 20;
    const maxY = window.innerHeight - 20;
    dialog.left = Math.min(maxX, Math.max(0, dialog.left));
    dialog.top = Math.min(maxY, Math.max(0, dialog.top));
    updateDialog(dialog)
  }
};

// 鼠标松开时停止拖拽
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

onMounted(() => {
  const resizableDiv = document.getElementById('dialog_' + String(dialog.id));

  let isResizing = false;
  let currentHandle: String | null;
  let minHeight = 100;
  let minWidth = 100;
  const resize_list = ['resize-lt', 'resize-t', 'resize-l', "resize-lb", "resize-b", "resize-rb", "resize-r"];
  resize_list.forEach((id) => {
    const resize_handle = document.getElementById(id)
    resize_handle?.addEventListener('mousedown', (e) => {
      isResizing = true;
      if (resizableDiv) {
        //设置鼠标样式
        resizableDiv.style.cursor = window.getComputedStyle(resize_handle, null).cursor
      }
      currentHandle = id.split('-')[1];
      e.stopPropagation();
    })
  })

  document.onmousemove = function (e) {
    if (!isResizing) return;
    if (!resizableDiv) return;
    // 限制鼠标不超出可视区域
    const maxX = window.innerWidth - 30;
    const maxY = window.innerHeight - 30;

    if (currentHandle) {
      let x = e.clientX
      let y = e.clientY
      let offsetRight = resizableDiv.getBoundingClientRect().right
      let offsetLeft = resizableDiv.getBoundingClientRect().left
      let offsetTop = resizableDiv.getBoundingClientRect().top
      let offsetBottom = resizableDiv.getBoundingClientRect().bottom

      if (currentHandle === 'r' && resizableDiv) {
        resizableDiv.style.width = (Math.floor(x - offsetLeft) >= minWidth ? Math.floor(x - offsetLeft) : minWidth) + 'px';
      } else if (currentHandle === 'b' && resizableDiv) {
        resizableDiv.style.height = (Math.floor(y - offsetTop) >= minHeight ? Math.floor(y - offsetTop) : minHeight) + 'px';
      } else if (currentHandle === 'l' && resizableDiv) {
        dialog.left = (Math.floor(offsetRight - x) >= minWidth ? x : (offsetRight - minWidth));
        updateDialog(dialog)
        resizableDiv.style.width = (Math.floor(offsetRight - x) >= minWidth ? Math.floor(offsetRight - x) : minWidth) + 'px';
      } else if (currentHandle === 't' && resizableDiv) {
        dialog.top = (offsetBottom - y >= minHeight ? y : (offsetBottom - minHeight));
        updateDialog(dialog)
        resizableDiv.style.height = (offsetBottom - y >= minHeight ? offsetBottom - y : minHeight) + 'px';
      } else if (currentHandle === 'lt' && resizableDiv) {
        dialog.top = (offsetBottom - y >= minHeight ? y : (offsetBottom - minHeight));
        resizableDiv.style.height = (offsetBottom - y >= minHeight ? offsetBottom - y : minHeight) + 'px';
        dialog.left = (Math.floor(offsetRight - x) >= minWidth ? x : (offsetRight - minWidth));
        resizableDiv.style.width = (Math.floor(offsetRight - x) >= minWidth ? Math.floor(offsetRight - x) : minWidth) + 'px';
        updateDialog(dialog)
      } else if (currentHandle === 'lb' && resizableDiv) {
        dialog.left = (Math.floor(offsetRight - x) >= minWidth ? x : (offsetRight - minWidth));
        resizableDiv.style.width = (Math.floor(offsetRight - x) >= minWidth ? Math.floor(offsetRight - x) : minWidth) + 'px';
        resizableDiv.style.height = (y - offsetTop >= minHeight ? y - offsetTop : minHeight) + 'px';
        updateDialog(dialog)
      } else if (currentHandle === 'rb' && resizableDiv) {
        resizableDiv.style.width = (Math.floor(x - offsetLeft) >= minWidth ? Math.floor(x - offsetLeft) : minWidth) + 'px';
        resizableDiv.style.height = (y - offsetTop >= minHeight ? y - offsetTop : minHeight) + 'px';
      }
    }
  };

  document.addEventListener('mouseup', () => {
    isResizing = false;
    currentHandle = null;
    if (resizableDiv) {
      //还原鼠标样式
      resizableDiv.style.cursor = 'auto'
    }
  });
})

</script>
<template>
  <div :id="'dialog_' + String(dialog.id)" @click="handleClick(dialog)" @mousedown="startDrag" ref="dialogBox"
       class="absolute h-4/5 w-[70%] bg-white rounded-xl border-2 border-[#6f6f6f30] overflow-visible shadow-[2px_2px_5px_0_rgba(0,0,0,0.3)] shadow-[#22222230] z-30"
       v-show="!dialog.hide" :style="{zIndex: dialog.zIndex ?? 10, left: dialog.left + 'px', top: dialog.top + 'px'}">
    <div class="resize-bar top">
      <div class="flex">
        <div id="resize-lt" class="cursor-nwse-resize w-[10px] h-[10px]"></div>
        <div id="resize-t" class="cursor-ns-resize w-full h-[5px]"></div>
      </div>
    </div>
    <div class="resize-bar left">
      <div id="resize-l" class="cursor-ew-resize h-full w-[10px]"></div>
      <div id="resize-lb" class="cursor-nesw-resize w-[15px] h-[10px]"></div>
    </div>
    <div class="resize-bar right">
      <div id="resize-r" class="cursor-ew-resize h-full w-[10px]"></div>
      <div id="resize-rb" class="cursor-nwse-resize w-[15px] h-[10px]"></div>
    </div>
    <div class="resize-bar bottom">
      <div class="flex">
        <div id="resize-b" class="cursor-ns-resize w-full h-[10px]"></div>
      </div>
    </div>
    <n-button-group class="absolute top-0 right-0">
      <n-button quaternary>
        <icon name="icon-Hide-copy" :size="20" ></icon>
      </n-button>
      <n-button quaternary>
        <icon name="icon-rectangle" :size="20"></icon>
      </n-button>
      <n-button quaternary>
        <icon name="icon-icon_wrong" :size="20"></icon>
      </n-button>
    </n-button-group>
<!--    <slot class="absolute"></slot>-->
  </div>
</template>

<style lang="less" scoped>
@import "@/style/dialog.less";
</style>
