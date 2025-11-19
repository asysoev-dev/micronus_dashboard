<script setup lang="ts">
import { LogIn } from 'lucide-vue-next';

const icons = {
    LogIn,
};

interface InputProps {
    id?: string;
    title?: string;
    leftIconName?: keyof typeof icons;
    rightIconName?: keyof typeof icons;
    disabled?: boolean;
}

const props = defineProps<InputProps>();
</script>

<template>
    <button
        :id="props.id"
        :disabled="disabled"
        class="h-10 pl-6 pr-6 md:min-w-1/3 flex justify-center items-center bg-linear-90 from-brand-300/80 to-brand-400/80 hover:opacity-75 active:opacity-75 transition-all duration-200 ease-in-out shadow-lg inset-shadow-sm inset-shadow-purple-900/50 rounded-full cursor-pointer disabled:hover:opacity-50 disabled:active:opacity-50 disabled:opacity-50 disabled:grayscale disabled:inset-shadow-none disabled:cursor-default disabled:text-gray-300"
    >
        <component :is="icons[leftIconName]" v-if="leftIconName" class="mr-1" />
        {{ props.title }}
        <component :is="icons[rightIconName]" v-if="rightIconName" class="ml-1" />
    </button>
</template>
