import { createRouter, createWebHistory } from "vue-router";
import Checkout from "../pages/Checkout.vue";
import OrderComplete from "../pages/OrderComplete.vue";

const routes = [
    {
        path: "/",
        name: "Checkout",
        component: Checkout,
    },
    {
        path: "/complete/:transactionId",
        name: "Complete",
        component: OrderComplete,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
