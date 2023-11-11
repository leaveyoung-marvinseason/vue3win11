import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import pinia from "@/store"
import router from "@/router"
import { APPS, BAR_APPS } from "./constants";
import { apps, barApps } from "./config/app";

const app = createApp(App);
app.provide(APPS, apps)
app.provide(BAR_APPS, barApps)

app.use(router);
app.use(pinia);

app.mount("#app");
