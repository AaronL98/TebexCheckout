<script lang="ts" setup>
import { ref, computed, onMounted, watch, defineModel } from "vue";
import axios from "axios";
import Button from "primevue/button";
import Chip from "primevue/chip";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import ProductItem from "@/components/ProductItem.vue";
import { formatCurrencyShort } from "@/helpers/formatCurrency";
import { BasketInterface, ProductInterface } from "/api/apiTypes.ts";
import { BASKET_API_PATH, API_HEADERS } from "@/constants/apiPaths.ts";
import { LOGO_PATH } from "@/constants/logoPath.ts";

//Basket fetched from API
const basket = defineModel<BasketInterface | null>();
const products = computed<ProductInterface[]>(
    () => basket.value?.products || []
);

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

onMounted(async () => {
    await fetchBasket();
});

const fetchBasket = async () => {
    const response = await axios
        .get(BASKET_API_PATH, API_HEADERS)
        .then((response) => {
            basket.value = response.data;
        })
        .catch(() => {
            console.error("Failed to fetch basket items:", error);
        });
};

const coupon = ref<string>("");
const couponInvalid = ref<boolean>(false);
watch(
    () => coupon.value,
    () => {
        couponInvalid.value = false;
    }
);

const couponAmount = computed<number>(() => {
    // If basket.value.couponCode, then we have a discount
    if (!basket.value?.couponCode) return 0;

    // The coupon endpoint does not return the discount amount, so it has to be calculated

    // The discount is cost of all products in basket - subTotal
    let basketRunningTotal = 0;
    basket.value.products.forEach((product) => {
        basketRunningTotal += product.price * product.quantity;
    });

    return basketRunningTotal - basket.value.subTotal;
});

const applyCoupon = async () => {
    const response = await axios
        .post(
            `${BASKET_API_PATH}/${basket.value.id}/coupon`,
            { code: coupon.value },
            API_HEADERS
        )
        .then((response) => {
            basket.value = response.data;
        })
        .catch((error) => {
            couponInvalid.value = true;
        });
};
</script>
<template>
    <div class="md:w-6/12 w-full h-full flex-col md:px-16 bg-surface-900">
        <!-- Logo: Desktop only -->
        <img :src="LOGO_PATH" class="hidden md:block w-fit my-10" alt="logo" />
        <!-- Basket items-->
        <div class="hidden md:block mb-4 font-bold text-sm">Your order</div>

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
        <div class="mb-2 font-bold text-sm">Coupon/Gift Card</div>
        <div class="flex">
            <InputText
                v-model="coupon"
                placeholder="Enter code here"
                class="flex-grow mr-2"
            />
            <Button
                @click="applyCoupon"
                :disabled="!coupon.length"
                severity="secondary"
                label="Confirm"
            />
        </div>
        <Message
            :class="{ invisible: !couponInvalid }"
            severity="error"
            size="small"
            variant="simple"
        >
            Coupon code is invalid
        </Message>

        <!-- Summary-->
        <div class="mt-4">
            <div class="mb-2 flex justify-between text-xs">
                <span>Subtotal: </span>
                <span>{{ subTotal }}</span>
            </div>
            <div class="mb-2 flex justify-between text-xs">
                <span>Sales tax: </span>
                <span>{{ salesTax }}</span>
            </div>

            <div v-if="basket?.couponCode" class="mb-2 flex flex-col">
                <span class="mb-2">Discounts:</span>
                <div class="flex flex-row justify-between mb-2">
                    <Chip :label="basket.couponCode" />
                    <span>- {{ formatCurrencyShort(couponAmount) }}</span>
                </div>
            </div>
            <div class="mb-2 flex justify-between font-bold text-xl">
                <span>Total price:</span>
                <span>{{ total }}</span>
            </div>
        </div>
    </div>
</template>
