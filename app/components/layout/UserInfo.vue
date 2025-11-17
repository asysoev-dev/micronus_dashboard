<script setup lang="ts">
import { CircleUserRound, LogOut } from 'lucide-vue-next';
const auth = useAuth();
const user = auth.user;
const handleLogOut = async () => {
    try {
        await auth.logout();
    } catch (error: any) {
        console.log('Error: ', error);
    }
};

onMounted(() => {
    auth.fetchUserProfile();
});
</script>

<template>
    <div class="p-4 flex justify-between items-center w-full md:mt-6 mb-8">
        <div class="flex">
            <CircleUserRound class="stroke-2 stroke-slate-300 w-12 h-12" />
            <div class="pl-4">
                <div class="text-slate-400">{{ user?.name }}</div>
                <div class="text-slate-600">{{ user?.email }}</div>
            </div>
        </div>
        <LogOut
            class="stroke-2 stroke-slate-300 hover:stroke-slate-500 active:stroke-slate-500 transition-all duration-200 ease-in-out w-8 h-8 ml-4"
            @click="handleLogOut"
        />
    </div>
</template>
