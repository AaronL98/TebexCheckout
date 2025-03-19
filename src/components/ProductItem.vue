<script lang="ts" setup>
import { withDefaults, computed } from "vue";
import { formatCurrency } from "@/helpers/formatCurrency";

interface Props {
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const props = defineProps<Props>();

const imagePath = computed<string>(() => `/public/img/products/${props.image}`);
</script>

<template>
    <div class="flex pb-4 items-center">
        <img :src="imagePath" alt="Product image" />
        <div class="flex flex-col pl-2">
            <span>{{ name }}</span>
            <span>Qty: {{ quantity }}</span>
        </div>

        <span class="ml-auto">{{ formatCurrency(price) }} </span>
    </div>
</template>
