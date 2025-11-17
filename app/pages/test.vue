<script setup lang="ts">
import { UserService } from '~/services/userService';
definePageMeta({
    middleware: 'auth-client',
});
interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}
const users = ref<User[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchUsers = async () => {
    try {
        isLoading.value = true;
        error.value = null;

        const response = await UserService.getAllUsers();
        users.value = response.data.users;
    } catch (err: any) {
        console.error('Failed to fetch users:', err);
        error.value = err.data?.message || 'Failed to load users';
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchUsers();
});
</script>
<template>
    <div class="text-slate-50">
        {{ users }}
    </div>
</template>
