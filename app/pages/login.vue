<script setup lang="ts">
definePageMeta({
    layout: 'admin',
});
const login = ref<string>('');
const password = ref<string>('dfgdfgdf');
</script>

<template>
    <h1 class="mb-6 text-lg text-center">Авторизация</h1>
    <div class="flex flex-col gap-4">
        <UiInput id="loginId" v-model="login" type="text" label="Логин" isRequiredStyle />
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
                disabled
                @click="
                    () => {
                        console.log('%c[LOG]LogIn: ', 'color: green;');
                    }
                "
            />
        </div>
    </div>
</template>
