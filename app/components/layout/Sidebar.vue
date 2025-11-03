<script setup lang="ts">
import { HomeIcon, SettingsIcon, UserIcon } from 'lucide-vue-next';
const { showSidebarStatus } = useSidebar();
</script>

<template>
    <div
        class="md:block w-full md:min-w-65 lg:min-w-80 h-full bg-transparent md:bg-brand-900 md:rounded-l-2xl"
        :class="{ hidden: !showSidebarStatus }"
    >
        <div class="text-slate-50 text-2xl w-full justify-center pt-4 hidden md:flex">
            <LayoutLogo />
        </div>
        <LayoutUserInfo />
        <nav class="space-y-2">
            <NuxtLink
                :to="`/`"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 group focus:bg-blue-50 transition-all duration-200 ease-in-out group"
            >
                <HomeIcon class="w-5 h-5 mr-3" />
                <span>Главная</span>
            </NuxtLink>

            <NuxtLink
                :to="`/`"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 group focus:bg-blue-50 transition-all duration-200 ease-in-out group"
            >
                <UserIcon class="w-5 h-5 mr-3" />
                <span>Профиль</span>
            </NuxtLink>
            <NuxtLink
                :to="`/`"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 group focus:bg-blue-50 transition-all duration-200 ease-in-out group"
            >
                <SettingsIcon class="w-5 h-5 mr-3" />
                <span>Настройки</span>
            </NuxtLink>
        </nav>
    </div>
</template>
