export const useSidebar = () => {
    type IconName = 'MonitorCog' | 'HousePlug' | 'UserIcon';

    interface sidebarItem {
        id: string;
        title: string;
        route: string;
        icon: IconName;
    }

    const sidebarItems: sidebarItem[] = [
        {
            id: 'dashboardId',
            title: 'Dashboard',
            route: '/',
            icon: 'MonitorCog',
        },
        {
            id: 'profileId',
            title: 'Профиль',
            route: '/test',
            icon: 'HousePlug',
        },
        {
            id: 'myDevicesId',
            title: 'Мои устройства',
            route: '/divices',
            icon: 'UserIcon',
        },
    ];
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
        sidebarItems,
    };
};
