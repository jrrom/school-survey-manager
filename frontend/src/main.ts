import { createApp, type App } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import Main from "./Main.vue";
import "./index.css";
import VueAxios from "vue-axios";
import axios from "axios";

const app: App = createApp(Main);

app.use(createPinia());
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(router);
router.isReady().then(() => {
    app.mount("#app");
});