import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// @ts-ignore
import router from "./router";
import PrimeVue from "primevue/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";

const TebexPreset = definePreset(Aura, {
    primitive: {
        tebexBlue: {
            50: "#E8F8F8",
            100: "#D0F0F0",
            200: "#A2E2E2",
            300: "#6FD2D2",
            400: "#41C4C3",
            500: "#34A7A7",
            600: "#298484",
            700: "#1F6565",
            800: "#154242",
            900: "#0B2323",
            950: "#051010",
        },
    },
    semantic: {
        primary: {
            50: "{tebexBlue.50}",
            100: "{tebexBlue.100}",
            200: "{tebexBlue.200}",
            300: "{tebexBlue.300}",
            400: "{tebexBlue.400}",
            500: "{tebexBlue.500}",
            600: "{tebexBlue.600}",
            700: "{tebexBlue.700}",
            800: "{tebexBlue.800}",
            900: "{tebexBlue.900}",
            950: "{tebexBlue.950}",
        },
    },
    components: {
        button: {
            border: {
                radius: "0px",
            },
        },
    },
});

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: TebexPreset,
        options: {
            darkModeSelector: ".dark-mode",
        },
    },
})
    .use(router)
    .mount("#app");
