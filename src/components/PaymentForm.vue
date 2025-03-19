<script lang="ts" setup>
import { ref, reactive } from "vue";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Button from "primevue/button";
import Message from "primevue/message";
import { BasketInterface } from "/api/apiTypes.ts";
import { formatCurrencyShort } from "@/helpers/formatCurrency";
import { Form } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

interface Props {
    total: BasketInterface["total"] | null;
}
const props = defineProps<Props>();

const initialValues = reactive({
    email: "",
    cardNumber: null,
    expiryDate: "",
    cvv: null,
    zipPostalCode: "",
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
            expiryDate: z.string().length(5, {
                message: "Invalid expiry date",
            }),
            cvv: z
                .string({ message: "Please provide a CVV/CVC" })
                .length(3, { message: "Invalid CVV/CVC" })
                .refine(
                    (val) =>
                        val.split("").every((char) => !isNaN(Number(char))),
                    { message: "CVV/CVC must contain only digits" }
                ),
            zipPostalCode: z
                .string() //US format: upto 5 chars, UK: Up to 7 (8 including a space)
                .min(5, { message: "Zip/postal code is too short" })
                .max(8, { message: "Zip/postal code is too long" }),
            nameOnCard: z
                .string()
                .min(1, { message: "Name on card too short" }),
        })
    )
);

const onFormSubmit = ({ valid }) => {
    console.log("Form submitted", valid);
};
</script>

<template>
    <div class="md:w-6/12 w-full h-full px-4 md:px-16 space-y-2">
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

        <Form
            v-slot="$form"
            @submit="onFormSubmit"
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
                    <label for="expiryDate"> Expiry date* </label>
                    <InputMask
                        name="expiryDate"
                        id="expiryDate"
                        placeholder="MM/YY"
                        class="w-full"
                        mask="99/99"
                    />
                    <Message
                        :class="{ invisible: !$form.expiryDate?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.expiryDate?.error?.message ||
                            "Form validation error"
                        }}
                    </Message>
                </div>
                <div class="col-span-1">
                    <label for="cvv"> CVC/CVV* </label>
                    <InputText
                        name="cvv"
                        id="cvv"
                        placeholder="123"
                        class="w-full"
                        inputmode="number"
                    />
                    <Message
                        :class="{ invisible: !$form.cvv?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.cvv?.error?.message || "Form validation error"
                        }}
                    </Message>
                </div>
                <div class="col-span-2">
                    <label for="zipPostalCode"> Zip/Postal code* </label>
                    <InputText
                        name="zipPostalCode"
                        id="zipPostalCode"
                        placeholder="12345"
                        class="w-full"
                        inputmode="text"
                    />
                    <Message
                        :class="{ invisible: !$form.zipPostalCode?.invalid }"
                        severity="error"
                        size="small"
                        variant="simple"
                    >
                        {{
                            $form.zipPostalCode?.error?.message ||
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
    </div>
</template>
