<script setup lang="ts">
import { AuthService } from '~/services/authService';

definePageMeta({
    layout: 'admin',
});
const email = ref<string>('');
const password = ref<string>('');

const isFilledForm = computed((): boolean => {
    return email.value.length > 0 && password.value.length > 0;
});

const handleLogin = async () => {
    try {
        const response = await AuthService.login({
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
    <h1 class="mb-6 text-lg text-center">Авторизация</h1>
    <div class="flex flex-col gap-4">
        <UiInput id="emailId" v-model="email" type="text" label="E-mail" isRequiredStyle />
        <UiInput
            id="passwordId"
            v-model="password"
            type="password"
            label="Пароль"
            isRequiredStyle
        />

        <div class="flex justify-between -mt-2">
            <NuxtLink
                :to="`/registration`"
                class="underline text-slate-500 text-xs hover:opacity-75 active:opacity-75"
            >
                <span>Регистрация</span>
            </NuxtLink>
            <NuxtLink
                :to="`/`"
                class="underline text-slate-500 text-xs hover:opacity-75 active:opacity-75"
            >
                <span>Забыли пароль?</span>
            </NuxtLink>
        </div>

        <div class="flex justify-center mt-3">
            <UiButton
                title="Войти"
                rightIconName="LogIn"
                :disabled="!isFilledForm"
                @click="handleLogin"
            />
        </div>
    </div>
</template>
