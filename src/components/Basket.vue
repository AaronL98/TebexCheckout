<script lang="ts" setup>
import Product from "@/components/Product.vue";
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Chip from "primevue/chip";
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
]);

interface Discount {
    label: string;
    amount: number;
}
const discounts = computed<Discount[]>(() => [
    { label: "25OFF", amount: 2 },
    { label: "50OFF", amount: 3 },
]);
</script>
<template>
    <div class="md:w-6/12 w-full h-full flex-col md:px-16 bg-surface-900">
        <!-- Logo: Desktop only -->
        <img
            src="/public/img/logo.svg"
            class="hidden md:block w-fit my-10"
            alt="logo"
        />
        <!-- Basket items-->
        <div class="hidden md:block mb-4 font-bold">Your order</div>

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
                :class="`mb-2 flex justify-between`"
            >
                <span>{{ cost.label }}</span>
                <span>{{ formatCurrencyShort(cost.price) }}</span>
            </div>
            <div class="mb-2 flex flex-col">
                <span class="mb-2">Discounts:</span>
                <div
                    v-for="discount in discounts"
                    class="flex flex-row justify-between mb-2"
                >
                    <Chip :label="discount.label" />
                    <!-- FIXME: support negatives in formatCurrency helpers-->
                    <span>- {{ formatCurrencyShort(discount.amount) }}</span>
                </div>
            </div>
            <div class="mb-2 flex justify-between">
                <span>Total price:</span>
                <span>$17.98</span>
            </div>
        </div>
    </div>
</template>
