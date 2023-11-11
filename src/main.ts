import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import pinia from "@/store"
import router from "@/router"
import { APPS } from "./constants";
import { apps } from "./config/app";

const app = createApp(App);
app.provide(APPS, apps)

app.use(router);
app.use(pinia);

app.mount("#app");
