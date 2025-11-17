<script setup lang="ts">
import { AuthService } from '~/services/authService';

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
        const response = await AuthService.register({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        if (response.user.id) {
            navigateTo('/');
        }
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
            id="repeatPasswordId"
            v-model="repeatPassword"
            type="password"
            label="Повторите пароль"
            isRequiredStyle
        />
        <div class="flex justify-between -mt-2">
            <NuxtLink
                :to="`/login`"
                class="underline text-slate-500 text-xs hover:opacity-75 active:opacity-75"
            >
                <span>Авторизация</span>
            </NuxtLink>
        </div>

        <div class="flex justify-center mt-3">
            <UiButton
                title="Зарегистрироваться"
                :disabled="!isFilledForm"
                @click="handleRegistration"
            />
        </div>
    </div>
</template>
