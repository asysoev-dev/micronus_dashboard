<script setup>
import { Menu, X } from 'lucide-vue-next';
const { showSidebarStatus, toggleSidebar } = useSidebar();
</script>

<template>
    <div class="text-slate-50 text-2xl w-full p-4 md:hidden flex justify-between">
        <LayoutLogo />
        <button class="relative top-[2px] right-8" @click="toggleSidebar">
            <Menu
                class="w-8 h-8 absolute inset-0 transition-all duration-300 ease-in-out hover:stroke-slate-500 active:stroke-slate-500"
                :class="showSidebarStatus ? 'opacity-0 scale-0' : 'opacity-100 scale-100'"
            />
            <X
                class="w-8 h-8 absolute inset-0 transition-all duration-300 ease-in-out hover:stroke-slate-500 active:stroke-slate-500"
                :class="showSidebarStatus ? 'opacity-100 scale-100' : 'opacity-0 scale-0'"
            />
        </button>
    </div>
    <div class="bg-brand-950/75 md:bg-brand-950 h-full md:rounded-2xl shadow-xl/30 flex">
        <LayoutSidebar />
        <div
            class="md:block w-full mt-4 ml-4 mb-4 pr-4 overflow-y-scroll"
            :class="{ hidden: showSidebarStatus }"
        >
            <slot />
        </div>
    </div>
</template>
