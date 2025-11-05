<script setup lang="ts">
import { authService } from '~/services/authService';

definePageMeta({
    layout: 'admin',
});

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const repeatPassword = ref<string>('');

const isFilledForm = computed((): boolean => {
    return (
        name.value.length > 0 &&
        email.value.length > 0 &&
        password.value.length > 0 &&
        repeatPassword.value.length > 0 &&
        password.value === repeatPassword.value
    );
});

const handleRegistration = async () => {
    try {
        const response = await authService.register({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        console.log('%c[LOG]response: ', 'color: green;', response);
    } catch (error: any) {
        console.log('Error: ', error);
    }
};
</script>

<template>
    <h1 class="mb-6 text-lg text-center">Регистрация</h1>
    <div class="flex flex-col gap-4">
        <UiInput id="nameId" v-model="name" type="text" label="Имя" isRequiredStyle />
        <UiInput id="emailId" v-model="email" type="email" label="E-mail" isRequiredStyle />
        <UiInput
            id="passwordId"
            v-model="password"
            type="password"
            label="Пароль"
            isRequiredStyle
        />
        <UiInput
            id="passwordId"
            v-model="repeatPassword"
            type="password"
            label="Повторите пароль"
            isRequiredStyle
        />

        <div class="flex justify-center mt-3">
            <UiButton
                title="Зарегистрироваться"
                :disabled="!isFilledForm"
                @click="handleRegistration"
            />
        </div>
    </div>
</template>
