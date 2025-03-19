<script lang="ts" setup>
import { ref, reactive } from "vue";
import { z } from "zod";
import { useRouter } from "vue-router";
import axios from "axios";
import Button from "primevue/button";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { formatCurrencyShort } from "@/helpers/formatCurrency";
import { BasketInterface } from "/api/apiTypes.ts";
import { BASKET_API_PATH } from "@/constants/apiPaths.ts";
import { LOGO_PATH } from "@/constants/logoPath.ts";

const router = useRouter();

interface Props {
    id: BasketInterface["id"];
    total: BasketInterface["total"] | null;
}
const props = defineProps<Props>();

const initialValues = reactive({
    email: "",
    cardNumber: null,
    cardExpiry: "",
    cardCvc: null,
    postalCode: "",
    nameOnCard: "",
});

const resolver = ref(
    zodResolver(
        z.object({
            email: z.string().email({ message: "Invalid email address" }),
            cardNumber: z
                .string({ mesasge: "Please provid a card number" })
                .length(19, {
                    message: "Card number must be exactly 16 digits", //19 because of the spaces
                })
                .refine(
                    (val) =>
                        val.split("").every((char) => !isNaN(Number(char))),
                    {
                        message: "Card number must contain only digits",
                    }
                ),
            cardExpiry: z.string().length(5, {
                message: "Invalid expiry date",
            }),
            cardCvc: z
                .string({ message: "Please provide a CVV/CVC" })
                .length(3, { message: "Invalid CVV/CVC" })
                .refine(
                    (val) =>
                        val.split("").every((char) => !isNaN(Number(char))),
                    { message: "CVV/CVC must contain only digits" }
                ),
            postalCode: z
                .string() //US format: upto 5 chars, UK: Up to 7 (8 including a space)
                .min(5, { message: "Zip/postal code is too short" })
                .max(8, { message: "Zip/postal code is too long" }),
            nameOnCard: z
                .string()
                .min(1, { message: "Name on card too short" }),
        })
    )
);

const paymentFailed = ref<boolean>(false);

const submitPayment = async ({ valid, values }) => {
    if (!valid) return;

    const response = await axios
        .post(`${BASKET_API_PATH}/${props.id}/checkout`, values)
        .then((response) => {
            if (response.data?.success) {
                const transactionId = response.data.transactionId;
                router.push({
                    name: "Complete",
                    params: { transactionId },
                });
            }
        })
        .catch((error) => {
            console.error("Failed to submit payment", error);
            paymentFailed.value = true;
        });
};
</script>

<template>
    <div class="md:w-6/12 w-full h-full px-4 md:px-16 space-y-2">
        <!-- Logo: Mobile only -->
        <img
            :src="LOGO_PATH"
            class="block md:invisible w-fit my-10"
            alt="logo"
        />
        <div class="hidden md:block mb-4">
            <span class="text-primary font-bold"> Make Payment </span>
            <span>> Order Confirmed</span>
        </div>

        <Form
            v-slot="$form"
            @submit="submitPayment"
            :initialValues="initialValues"
            :resolver="resolver"
            class="my-class"
        >
            <!-- Email-->
            <div>
                <label for="email"> Email* </label>
                <InputText
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    class="w-full"
                    inputmode="email"
                />
                <Message
                    :class="{ invisible: !$form.email?.invalid }"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ $form.email?.error?.message || "Form validation error" }}
                </Message>
            </div>

            <!-- Card number -->
            <div>
                <label for="cardNumber"> Card number* </label>

                <InputMask
                    name="cardNumber"
                    id="cardNumber"
                    placeholder="1234 5678 9101 1121"
                    class="w-full"
                    inputmode="number"
                    mask="9999 9999 9999 9999"
                />
                <Message
                    :class="{ invisible: !$form.cardNumber?.invalid }"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{
                        $form.cardNumber?.error?.message ||
                        "Form validation error"
                    }}
                </Message>
            </div>

            <!-- Expiry, CVV, Zip -->
            <div class="grid grid-cols-2 xl:grid-cols-4 gap-x-2">
                <div class="col-span-1">
                    <label for="cardExpiry"> Expiry date* </label>
                    <InputMask
                        name="cardExpiry"
                        id="cardExpiry"
                        placeholder="MM/YY"
                        class="w-full"
                        mask="99/99"
                    />
                    <Message
                        :class="{ invisible: !$form.cardExpiry?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.cardExpiry?.error?.message ||
                            "Form validation error"
                        }}
                    </Message>
                </div>
                <div class="col-span-1">
                    <label for="cardCvc"> CVC/CVV* </label>
                    <InputText
                        name="cardCvc"
                        id="cardCvc"
                        placeholder="123"
                        class="w-full"
                        inputmode="number"
                    />
                    <Message
                        :class="{ invisible: !$form.cardCvc?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.cardCvc?.error?.message ||
                            "Form validation error"
                        }}
                    </Message>
                </div>
                <div class="col-span-2">
                    <label for="postalCode"> Zip/Postal code* </label>
                    <InputText
                        name="postalCode"
                        id="postalCode"
                        placeholder="12345"
                        class="w-full"
                        inputmode="text"
                    />
                    <Message
                        :class="{ invisible: !$form.postalCode?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.postalCode?.error?.message ||
                            "Form validation error"
                        }}
                    </Message>
                </div>
            </div>

            <div>
                <label for="nameOnCard"> Name on card* </label>
                <InputText
                    name="nameOnCard"
                    id="nameOnCard"
                    placeholder="John Doe"
                    class="w-full"
                    inputmode="text"
                />
                <Message
                    :class="{ invisible: !$form.nameOnCard?.invalid }"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{
                        $form.nameOnCard?.error?.message ||
                        "Form validation error"
                    }}
                </Message>
            </div>

            <Button
                :label="`Pay by Card ∙ ${formatCurrencyShort(props.total)}`"
                type="submit"
                class="w-full"
            />
        </Form>

        <Message v-if="paymentFailed" class="mt-4" severity="error"
            >There was an issue submitting your payment
        </Message>
    </div>
</template>
