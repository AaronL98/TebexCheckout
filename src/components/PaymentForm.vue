<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";

const email = ref<string>("");
const cardNumber = ref<number>();
const expiryDate = ref<string>("");
const cvv = ref<number>();
const zipPostalCode = ref<string>("");
const nameOnCard = ref<string>("");
</script>

<template>
    <div class="md:w-6/12 h-full px-4 md:px-16 space-y-2">
        <!-- Logo: Mobile only -->
        <img
            src="/public/img/logo.svg"
            class="block md:invisible w-fit my-10"
            alt="logo"
        />
        <div class="hidden md:block mb-4">
            <span class="text-primary font-bold"> Make Payment </span>
            <span>> Order Confirmed</span>
        </div>

        <!-- Email-->
        <div>
            <label for="email"> Email* </label>
            <InputText
                v-model="email"
                id="email"
                placeholder="Enter your email address"
                class="w-full"
            />
        </div>

        <!-- Card number -->
        <div>
            <label for="cardNumber"> Card number* </label>
            <InputText
                v-model="cardNumber"
                id="cardNumber"
                placeholder="1234 5678 9101 1121"
                class="w-full"
            />
        </div>

        <!-- Expiry, CVV, Zip -->
        <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 space-y-2">
            <div class="col-span-1">
                <label for="expiryDate"> Expiry date* </label>
                <InputText
                    v-model="expiryDate"
                    id="expiryDate"
                    placeholder="MM/YY"
                    class="w-full"
                />
            </div>
            <div class="col-span-1">
                <label for="cvv"> CVC/CVV* </label>
                <InputText
                    v-model="cvv"
                    id="cvv"
                    placeholder="123"
                    class="w-full"
                />
            </div>
            <div class="col-span-2">
                <label for="zipPostalCode"> Zip/Postal code* </label>
                <InputText
                    v-model="zipPostalCode"
                    id="zipPostalCode"
                    placeholder="12345"
                    class="w-full"
                />
            </div>
        </div>

        <div>
            <label for="nameOnCard"> Name on card* </label>
            <InputText
                v-model="nameOnCard"
                id="nameOnCard"
                placeholder="John Doe"
                class="w-full"
            />
        </div>

        <Button label="Pay by Card" class="w-full" />
    </div>
</template>
