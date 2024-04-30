import { createApp } from "vue";
import { createPinia } from "pinia";
// import App from "./src/App.vue";

import router from "./router";

import "./assets/main.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
