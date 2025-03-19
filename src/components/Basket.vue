<script lang="ts" setup>
import ProductItem from "@/components/ProductItem.vue";
import { ref, computed, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Chip from "primevue/chip";
import { formatCurrencyShort } from "@/helpers/formatCurrency";
import axios from "axios";

import { Basket, Product } from "/api/apiTypes.ts";

const BASKET_API_PATH: string = "/api/basket";
const API_HEADERS = {
    headers: {
        "Content-Type": "application/json",
    },
};

const LOGO_PATH: string = "/public/img/logo.svg";

//Basket fetched from API
const basket = ref<Basket | null>(null);
const products = computed<Product[]>(() => basket.value?.products || []);

//Price summary
const subTotal = computed<string>(() =>
    formatCurrencyShort(basket.value?.subTotal || 0)
);

const salesTax = computed<string>(() =>
    formatCurrencyShort(basket.value?.salesTax || 0)
);

const total = computed<string>(() =>
    formatCurrencyShort(basket.value?.total || 0)
);

//TODO: Hook upto API
interface Discount {
    label: string;
    amount: number;
}
const discounts = computed<Discount[]>(() => [
    { label: "25OFF", amount: 2 },
    { label: "50OFF", amount: 3 },
]);

onMounted(async () => {
    await fetchBasket();
});

const fetchBasket = async () => {
    const response = await axios
        .get(BASKET_API_PATH, API_HEADERS)
        .then((response) => {
            console.log("Basket set to:", response.data);
            basket.value = response.data;
        })
        .catch(() => {
            console.error("Failed to fetch basket items:", error);
        });
};

const coupon = ref<string>("");
const couponMessage = ref<string>("");
watch(
    () => coupon.value,
    () => {
        couponMessage.value = "";
    }
);

const applyCoupon = async () => {
    const response = await axios
        .post(
            `${BASKET_API_PATH}/${basket.value.id}/coupon`,
            { code: coupon.value },
            API_HEADERS
        )
        .then((response) => {
            basket.value = response.data;
            console.log("Coupon applied, basket set to:", response.data);
        })
        .catch((error) => {
            couponMessage.value = "Invalid coupon code";
        });
};
</script>
<template>
    <div class="md:w-6/12 w-full h-full flex-col md:px-16 bg-surface-900">
        <!-- Logo: Desktop only -->
        <img :src="LOGO_PATH" class="hidden md:block w-fit my-10" alt="logo" />
        <!-- Basket items-->
        <div class="hidden md:block mb-4 font-bold">Your order</div>

        <div class="max-h-90 h-90 overflow-y-auto">
            <ProductItem
                v-for="product in products"
                :key="product.name"
                :name="product.name"
                :image="product.image"
                :price="product.price"
                :quantity="product.quantity"
            />
        </div>

        <!-- Coupons -->
        <div class="mb-2">Coupon/Gift Card</div>
        <div class="flex">
            <InputText
                v-model="coupon"
                placeholder="Enter code here"
                class="flex-grow mr-2"
            />
            <Button
                @click="applyCoupon"
                :disabled="!coupon.length"
                label="Confirm"
            />
        </div>
        <span class="text-red-400">{{ couponMessage }}</span>

        <!-- Summary-->
        <div class="mt-4">
            <div class="mb-2 flex justify-between">
                <span>Subtotal: </span>
                <span>{{ subTotal }}</span>
            </div>
            <div class="mb-2 flex justify-between">
                <span>Sales tax: </span>
                <span>{{ salesTax }}</span>
            </div>

            <div v-if="false" class="mb-2 flex flex-col">
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
                <span>{{ total }}</span>
            </div>
        </div>
    </div>
</template>
