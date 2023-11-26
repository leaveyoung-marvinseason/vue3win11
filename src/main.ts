import { createApp, toRaw } from "vue";
import "./index.css";
import App from "./App.vue";
import pinia from "@/store";
import router from "@/router";
import { APPS, BAR_APPS } from "./constants";
import { apps, barApps } from "./config/app";
import { AppProps, BarAppProps } from "@/types/app.ts";


const app = createApp(App);
app.provide<AppProps[]>(APPS, apps);
app.provide<BarAppProps[]>(BAR_APPS, barApps);

app.use(router);
app.use(pinia);

app.mount("#app");

// import { test } from "@/test/dialog/dialog_open_close.ts";

// test();