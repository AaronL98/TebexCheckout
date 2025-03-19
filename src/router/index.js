import { createRouter, createWebHistory } from "vue-router";
import Checkout from "../pages/Checkout.vue";

const routes = [
    {
        path: "/",
        name: "Checkout",
        component: Checkout,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
