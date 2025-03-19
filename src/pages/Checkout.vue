<template>
    <div class="flex h-screen overflow-hidden">
        <Basket class="hidden md:flex" />
        <PaymentForm />

        <Drawer
            v-model:visible="visible"
            header="Your order"
            position="bottom"
            class="!h-full"
        >
            <Basket />
        </Drawer>

        <!-- FIXME: Positioning here is causing slightly scrolling x/y-->
        <div class="md:hidden fixed bottom-6 right-6">
            <OverlayBadge value="2" severity="primary">
                <Button
                    icon="pi pi-shopping-cart"
                    @click="openBottomSheet"
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

const visible = ref<boolean>(false);

const openBottomSheet = () => {
    visible.value = true;
};
</script>
