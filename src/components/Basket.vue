<script lang="ts" setup>
import Product from "@/components/Product.vue";
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { formatCurrencyShort } from "@/helpers/formatCurrency";

//TODO: Migrate this to vuex store
const basket = ref(["Medium booster", "Small coins"]);

interface BasketCost {
    label: string;
    price: number;
    class?: string;
}

const basketCosts = computed<BasketCost[]>(() => [
    { label: "Subtotal:", price: 14.98 },
    { label: "Sales tax:", price: 3 },
    { label: "Total price:", price: 17.98, class: "font-bold" },
]);
</script>
<template>
    <div class="md:w-6/12 w-full flex-col md:px-16 bg-surface-900 h-full">
        <!-- Logo: Desktop only -->
        <img
            src="/public/img/logo.svg"
            class="hidden md:block w-fit my-10"
            alt="logo"
        />
        <!-- Basket items-->
        <div class="hidden md:block mb-4">Your order</div>

        <div class="max-h-90 h-90 overflow-y-auto">
            <Product
                v-for="item in basket"
                :key="item"
                :name="item"
                image="medium_booster.png"
                :price="50"
                :quantity="1"
            />
        </div>

        <!-- Coupons -->
        <div class="mb-2">Coupon/Gift Card</div>
        <div class="flex">
            <InputText placeholder="Enter code here" class="flex-grow mr-2" />
            <Button label="Confirm" />
        </div>
        <span class="text-red-400">Space for error message</span>

        <!-- Summary-->
        <div class="mt-4">
            <div
                v-for="cost in basketCosts"
                :class="`${cost.class} mb-2 flex justify-between`"
            >
                <span>{{ cost.label }}</span>
                <span>{{ formatCurrencyShort(cost.price) }}</span>
            </div>
        </div>
    </div>
</template>
