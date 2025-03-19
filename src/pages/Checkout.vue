<template>
    <div class="flex h-screen overflow-hidden">
        <Basket v-model="basket" class="hidden md:flex" />
        <PaymentForm />

        <Drawer
            v-model:visible="visible"
            header="Your order"
            position="bottom"
            class="!h-full"
        >
            <Basket v-model="basket" />
        </Drawer>

        <!-- FIXME: Positioning here is causing slightly scrolling x/y-->
        <div class="md:hidden fixed bottom-6 right-6">
            <OverlayBadge value="2" severity="primary">
                <Button
                    @click="openBottomSheet"
                    size="large"
                    icon="pi pi-shopping-cart"
                    severity="secondary"
                    rounded
                />
            </OverlayBadge>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Basket from "@/components/Basket.vue";
import PaymentForm from "@/components/PaymentForm.vue";
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import OverlayBadge from "primevue/overlaybadge";

import { BasketInterface } from "/api/apiTypes.ts";

const visible = ref<boolean>(false);

const openBottomSheet = () => {
    visible.value = true;
};

//The basket must be known in the payment form too, otherwise we could just hold this in the basket component
const basket = ref<BasketInterface | null>();
</script>
