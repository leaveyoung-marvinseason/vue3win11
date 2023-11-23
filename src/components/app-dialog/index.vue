<!--
  Author: marvin-season
  Created: 2023-11
-->
<script setup lang="ts">
import {DialogProps} from "@/types/dialog.ts";
import {nextTick, onMounted, reactive, ref, Ref, toRaw, unref} from "vue";

const {dialog} = defineProps<{
  dialog: DialogProps
}>();
// const dialog = reactive({
//   id: 'test',
//   hide: false,
//   zIndex: 20,
//   left: 20,
//   top: 20
// })

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
const startDrag = (event:any) => {
  isDragging.value = true;
  offsetX.value = event.clientX - dialog.left;
  offsetY.value = event.clientY - dialog.top;
  // offsetX.value = Number(window.getComputedStyle(unref(dialogBox), null).getPropertyValue('left').split("px")[0])
  // offsetX.value = Number(window.getComputedStyle(unref(dialogBox), null).getPropertyValue('left').split("px")[0])

  // 添加mousemove和mouseup事件监听
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
};

// 鼠标移动时拖拽元素
const handleDrag = (event:any) => {
  if (isDragging && unref(dialogBox) != null) {
    dialog.left = event.clientX - unref(offsetX);
    dialog.top = event.clientY - unref(offsetY);

    // 限制元素不超出可视区域
    const maxX = window.innerWidth - 30; // 假设可视区域宽度为窗口宽度减去100
    const maxY = window.innerHeight - 30; // 假设可视区域高度为窗口高度减去100
    dialog.left = Math.min(maxX, Math.max(0, dialog.left));
    if (dialog.left > window.innerWidth - unref(dialogBox).clientWidth - 5) {
      dialog.left = window.innerWidth - unref(dialogBox).clientWidth - 5
    }
    dialog.top = Math.min(maxY, Math.max(0, dialog.top));
    if (dialog.top > window.innerHeight - unref(dialogBox).clientHeight - 5) {
      dialog.top = window.innerHeight - unref(dialogBox).clientHeight - 5
    }
  }
};

// 鼠标松开时停止拖拽
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

onMounted(() => {

  const resizableDiv = document.getElementById(String(dialog.id));

  let isResizing = false;
  let currentHandle : String | null;
  const resize_list = ['resize-lt', 'resize-t', 'resize-l', "resize-lb", "resize-b", "resize-rb", "resize-r"]
  resize_list.forEach((id) => {
    const resize_handle = document.getElementById(id)
    resize_handle?.addEventListener('mousedown', (e) => {
      isResizing = true;
      currentHandle = id.split('-')[1];
      e.stopPropagation()
    })
  })

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    if (!resizableDiv) return;
    if (currentHandle) {
      let x = e.clientX
      let y = e.clientY
      let offsetRight = resizableDiv.getBoundingClientRect().right
      let offsetLeft = resizableDiv.getBoundingClientRect().left
      let offsetTop = resizableDiv.getBoundingClientRect().top
      let offsetBottom = resizableDiv.getBoundingClientRect().bottom
      if (currentHandle === 'r' && resizableDiv) {
        resizableDiv.style.width = Math.floor(x- offsetLeft) + 'px';
      } else if (currentHandle === 'b' && resizableDiv) {
        resizableDiv.style.height = y - offsetTop + 'px';
      } else if (currentHandle === 'l' && resizableDiv) {
        resizableDiv.style.left = x + 'px';
        resizableDiv.style.width = offsetRight - x + 'px';
      } else if (currentHandle === 't' && resizableDiv) {
        resizableDiv.style.top = y + 'px';
        resizableDiv.style.height = offsetBottom - y + 'px';
      }else if(currentHandle === 'lt' && resizableDiv){
        resizableDiv.style.top = y + 'px';
        resizableDiv.style.height = offsetBottom - y + 'px';
        resizableDiv.style.left = x + 'px';
        resizableDiv.style.width = offsetRight - x + 'px';
      }else if(currentHandle === 'lb' && resizableDiv){
        resizableDiv.style.left = x + 'px';
        resizableDiv.style.width = offsetRight - x + 'px';
        resizableDiv.style.height = y - offsetTop + 'px';
      }else if(currentHandle === 'rb' && resizableDiv){
        resizableDiv.style.width = x- offsetLeft + 'px';
        resizableDiv.style.height = y - offsetTop + 'px';
      }
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    currentHandle = null;
  });
})

</script>
<template>
  <div :id="String(dialog.id)" @click="handleClick(dialog)" @mousedown="startDrag" ref="dialogBox"
       class="absolute h-4/5 w-[70%] bg-white rounded-xl border-2 border-[#6f6f6f30] transition-all overflow-visible shadow-[2px_2px_5px_0_rgba(0,0,0,0.3)] shadow-[#22222230] z-30"
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

  </div>
</template>

<style lang="less" scoped>
@import "@/style/dialog.less";
</style>
