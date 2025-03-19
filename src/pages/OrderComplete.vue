<script lang="ts" setup>
import { LOGO_PATH } from "@/constants/logoPath.ts";
import InputText from "primevue/inputtext";
</script>

<template>
    <img :src="LOGO_PATH" alt="Logo" class="mx-auto my-10" />

    <div
        class="flex flex-col items-center w-7/12 border-1 border-primary p-8 mx-auto rounded-xs border-surface-800"
    >
        <img src="/public/img/success.svg" alt="Success" />
        <span class="text-3xl font-bold mt-4">Order Complete</span>
        <span class="text-lg mt-4 text-center">
            Thank you for your payment. You will receive your purchased products
            shortly.
        </span>

        <InputText
            readonly
            :model-value="`Order Number: ${$route.params.transactionId}`"
            placeholder="Enter your email address"
            class="w-full md:w-6/12 mt-4"
            fluid
        />
    </div>
</template>
