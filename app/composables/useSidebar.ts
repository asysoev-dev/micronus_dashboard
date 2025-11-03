export const useSidebar = () => {
    const showSidebarStatus = useState<boolean>('sidebar-status', () => false);

    const toggleSidebar = () => {
        showSidebarStatus.value = !showSidebarStatus.value;
    };
    const resetSidebar = () => {
        showSidebarStatus.value = false;
    };
    return {
        showSidebarStatus: readonly(showSidebarStatus),
        toggleSidebar,
        resetSidebar,
    };
};
