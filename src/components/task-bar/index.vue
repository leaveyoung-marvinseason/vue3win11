<script setup lang="ts">
import { BAR_APPS } from "@/constants";
import { inject, ref } from "vue";
import WinApp from "@/components/win-app/index.vue";
import { AppProps, BarAppProps } from "@/types/app";
import { useDialogStore } from "@/store/dialog.ts";
import { AppAction } from "@/types";
import { random0_9 } from "@/utils";
import { DrawerPlacement, NDrawer, NDrawerContent, NButton } from "naive-ui";
import { useAuthStore } from "@/store";
import { useRouter } from "vue-router";

const { openDialog } = useDialogStore();
const { logout } = useAuthStore();
const router = useRouter();

const barApps = inject(BAR_APPS);

const active = ref<boolean>(false);
const placement = ref<DrawerPlacement>("bottom");
const currentApp = ref<AppProps>();

const handleClick = (app: BarAppProps) => {
  console.log(app);
  if (app.action == AppAction.A1) {
    currentApp.value = app;
    active.value = true;
  } else {
    openDialog({
      id: app.id,
      left: random0_9() * 50,
      top: random0_9() * 20,
      zIndex: -1,
      hide: false,
      app,
    });
  }
};
</script>

<template>
  <NDrawer
    :drawer-style="{ width: '50%', left: '25%', bottom: '40px' }"
    :height="700"
    v-model:show="active"
    :placement="placement"
  >
    <NDrawerContent title="">
      <div class="flex flex-col justify-between h-full">
        <div>
          <span>{{ currentApp }}</span>
        </div>
        <div class="flex justify-between p-2">
          <div>left</div>
          <div>
            <NButton
              @click="
                async () => {
                  console.log('aa');
                  try {
                    await logout();
                    await router.push({ path: '/' });
                    console.log('aaa');
                  } catch (e) {
                    console.log(e);
                  }
                }
              "
              >注销登录
            </NButton>
          </div>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
  <div class="h-12 bg-slate-50 opacity-80 flex items-center justify-center p-2">
    <div class="flex gap-1">
      <WinApp
        v-for="(barApp, index) in barApps"
        :size="28"
        :key="index"
        :app="barApp"
        @click-app="handleClick(barApp)"
      />
    </div>
  </div>
</template>
