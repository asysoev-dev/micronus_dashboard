import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to, _) => {
    const auth = useAuth();

    const protectedPages = ['/login', '/registration'];

    if (protectedPages.includes(to.path)) {
        return;
    }

    if (!auth.isAuthenticated.value) {
        return navigateTo('/login');
    }
});
