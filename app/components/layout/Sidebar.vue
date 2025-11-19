<script setup lang="ts">
import { MonitorCog, HousePlug, UserIcon } from 'lucide-vue-next';
const { showSidebarStatus, sidebarItems, toggleSidebar } = useSidebar();
const currentRoute = useRoute();
const router = useRouter();

const icons = {
    MonitorCog,
    HousePlug,
    UserIcon,
};

const isActiveRoute = (itemRoute: string) => {
    return currentRoute.path === itemRoute;
};

router.afterEach(() => {
    if (showSidebarStatus.value) {
        toggleSidebar();
    }
});
</script>

<template>
    <div
        class="md:block md:min-w-65 lg:min-w-80 h-full bg-transparent md:bg-brand-900 md:rounded-l-2xl"
        :class="{ hidden: !showSidebarStatus, 'w-full': showSidebarStatus }"
    >
        <div class="text-slate-50 text-2xl w-full justify-center pt-4 hidden md:flex">
            <LayoutLogo />
        </div>
        <LayoutUserInfo />
        <nav class="space-y-2 pl-3">
            <NuxtLink
                v-for="item in sidebarItems"
                :key="item.id"
                :to="item.route"
                class="flex items-center px-6 py-1 h-12 rounded-l-sm text-gray-200 hover:bg-linear-180 from-brand-300/30 to-brand-400/30 group focus:bg-linear-180 from-brand-300/30 to-brand-400/30 transition-all duration-200 ease-in-out group relative"
                :class="{
                    'bg-linear-180 from-brand-300/80 to-brand-400/80': isActiveRoute(item.route),
                }"
            >
                <div
                    class="sidebar-item-triangle absolute left-0 top-1/2 transform -translate-y-1/2"
                ></div>
                <component
                    :is="icons[item.icon]"
                    class="w-5 h-5 mr-2 ml-1"
                    :class="[
                        { 'w-10 h-10 ml-[-10px]': isActiveRoute(item.route) },
                        { 'mr-5 ml-[-1px]': !isActiveRoute(item.route) },
                    ]"
                />
                <span>{{ item.title }}</span>
            </NuxtLink>
        </nav>
    </div>
</template>
