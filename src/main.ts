import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// @ts-ignore
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
    },
})
    .use(router)
    .mount("#app");
