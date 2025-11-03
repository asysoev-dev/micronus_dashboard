<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next';

interface InputProps {
    id?: string;
    type?: string;
    label?: string;
    isRequiredStyle?: boolean;
    disabled?: boolean;
}

const props = defineProps<InputProps>();

const model = defineModel<string>();

const isShowPassword = ref<boolean>(false);
</script>

<template>
    <div class="flex flex-col">
        <label :for="props.id" class="pb-1 text-xs relative">
            {{ props.label }}
            <span v-if="isRequiredStyle" class="text-red-300 absolute bottom-1/3 ml-px">*</span>
        </label>
        <div class="relative">
            <input
                :id="props.id"
                v-model="model"
                :type="!isShowPassword ? props.type : 'text'"
                class="h-10 pl-3 pr-3 border border-white rounded-md w-full bg-slate-50 outline-none text-gray-950 text-sm disabled:bg-gray-200 disabled:text-gray-500"
                :disabled="disabled"
            />
            <Eye
                v-if="props.type === 'password' && !isShowPassword"
                class="absolute stroke-brand-700 top-[9px] right-3 cursor-pointer"
                :class="{ 'pointer-events-none': disabled }"
                @mousedown.prevent="isShowPassword = !isShowPassword"
                @touchstart.prevent="isShowPassword = !isShowPassword"
            />
            <EyeOff
                v-if="props.type === 'password' && isShowPassword"
                class="absolute stroke-brand-700 top-[9px] right-3 cursor-pointer"
                :class="{ 'pointer-events-none': disabled }"
                @mousedown.prevent="isShowPassword = !isShowPassword"
                @touchstart.prevent="isShowPassword = !isShowPassword"
            />
        </div>
    </div>
</template>
