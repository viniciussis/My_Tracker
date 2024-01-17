import { createApp } from "vue";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";
import router from "./routes";
import { key, store } from "./store";

addIcons(FaFlag, RiZhihuFill);

createApp(App)
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(store, key)
  .mount("#app")
