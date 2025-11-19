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
    if (showSidebarStatus) {
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
        <nav class="space-y-2">
            <NuxtLink
                v-for="item in sidebarItems"
                :key="item.id"
                :to="item.route"
                class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 group focus:bg-blue-50 transition-all duration-200 ease-in-out group"
                :class="{
                    'bg-blue-50 text-blue-600': isActiveRoute(item.route),
                }"
            >
                <component :is="icons[item.icon]" class="w-5 h-5 mr-3" />
                <span>{{ item.title }}</span>
            </NuxtLink>
        </nav>
    </div>
</template>
