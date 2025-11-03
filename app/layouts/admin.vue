<template>
    <div class="flex items-center justify-center min-h-screen flex-col pb-30">
        <div class="text-slate-50 text-2xl w-full flex justify-center p-4 md:pt-0">
            <LayoutLogo />
        </div>
        <div
            class="pt-8 pb-8 bg-brand-950/75 md:bg-brand-950 md:rounded-2xl shadow-xl/30 p-4 w-full md:w-2/4 lg:w-2/5 xl:w-1/3"
        >
            <slot />
        </div>
    </div>
</template>

<script setup></script>
