export const usePopup = () => {
    const activePopupId = ref<string | null>(null);
    const popupRef = ref<HTMLElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (activePopupId.value && popupRef.value) {
            const clickedElement = event.target as Node;
            if (!popupRef.value.contains(clickedElement)) {
                const isPopupButton = (event.target as Element)?.closest('.popup-list');
                if (!isPopupButton) {
                    activePopupId.value = null;
                }
            }
        }
    };

    const togglePopup = (deviceId: string, event: MouseEvent) => {
        popupRef.value = event.target as HTMLElement;
        activePopupId.value = activePopupId.value === deviceId ? null : deviceId;
    };

    const closePopup = () => {
        activePopupId.value = null;
    };

    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });

    return {
        activePopupId,
        togglePopup,
        closePopup,
    };
};
