<script setup lang="ts">
import { Plus, EllipsisVertical, Dot } from 'lucide-vue-next';
definePageMeta({
    middleware: 'auth-client',
});

const addNewDevise = async () => {};

const statusMap = {
    connected: 'В сети',
    disconnected: 'Недоступен',
};

interface device {
    id: string;
    name: string;
    status: keyof typeof statusMap;
    aliace?: string | null;
    mac_address: string;
    channels: string[];
}
const devices = ref<device[]>([
    {
        id: '1111',
        name: 'esp8266_switch',
        status: 'connected',
        aliace: null,
        mac_address: '11-22-33-44-F3-80',
        channels: [
            'temperature_0',
            'temperature_1',
            'humidity_0',
            'switch_0',
            'switch_1',
            'switch_2',
            'switch_3',
            'voltage_0',
            'barel_0',
            'barel_1',
        ],
    },
    {
        id: '2222',
        name: 'esp8266_relay',
        status: 'disconnected',
        aliace: null,
        mac_address: '11-22-33-44-F3-81',
        channels: ['switch_0', 'switch_1'],
    },
    {
        id: '3333',
        name: 'esp32',
        status: 'disconnected',
        aliace: 'Тестовый',
        mac_address: '11-22-33-44-F3-82',
        channels: [],
    },
]);

const getChannelChips = (channel: string): string => {
    const [name, number] = channel.split('_');
    if (!name) return channel;
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return number ? `${capitalized} ${number}` : capitalized;
};

const getDeviceStatus = (status: keyof typeof statusMap): string => {
    return statusMap[status];
};

const { togglePopup, closePopup, activePopupId } = usePopup();
</script>
<template>
    <div class="grid grid-auto-flow lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
            v-for="deviceItem in devices"
            :key="deviceItem.id"
            class="w-full bg-brand-900 p-4 rounded-xl flex flex-col shadow-sm/30"
        >
            <div class="mb-4 flex justify-between relative">
                <div class="flex items-center">{{ deviceItem.aliace || deviceItem.name }}</div>
                <EllipsisVertical
                    class="h-8 w-8 py-1 rounded-xs cursor-pointer hover:bg-gray-600 active:bg-gray-600 transition-all duration-200 ease-in-out"
                    @click="togglePopup(deviceItem.id, $event)"
                />
                <UiPopup
                    v-if="activePopupId === deviceItem.id"
                    listClasses="w-full bg-brand-800/98 p-4 rounded-xl"
                    :itemList="[
                        {
                            title: 'Переименовать',
                            action: () => console.log('Переименовать', deviceItem.id),
                        },
                        {
                            title: 'Перезагрузить',
                            action: () => console.log('Перезагрузить', deviceItem.id),
                        },
                        {
                            title: 'Отключить',
                            action: () => console.log('Отключить', deviceItem.id),
                        },
                        {
                            title: 'Удалить',
                            action: () => console.log('Удалить', deviceItem.id),
                        },
                    ]"
                    @close="closePopup"
                />
            </div>
            <div class="lg:h-40 overflow-hidden overflow-y-auto">
                <div class="text-sm">MAC-адрес: {{ deviceItem.mac_address }}</div>
                <div class="text-sm mt-1">Доступные каналы:</div>
                <div class="flex flex-wrap gap-1 mt-1">
                    <div
                        v-for="channel in deviceItem.channels"
                        :key="deviceItem.id + channel"
                        class="text-xs py-px px-2 bg-gray-400 text-gray-700 w-fit rounded-xs text-nowrap"
                    >
                        {{ getChannelChips(channel) }}
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <Dot
                    class="h-8 w-8"
                    :class="[
                        { 'text-green-500': deviceItem.status === 'connected' },
                        { 'text-red-400': deviceItem.status === 'disconnected' },
                    ]"
                />
                <div class="text-xs text-gray-500">
                    {{ getDeviceStatus(deviceItem.status) }}
                </div>
            </div>
        </div>
        <div
            :class="`w-full bg-brand-900 p-4 rounded-xl flex flex-col justify-center items-center opacity-75 cursor-pointer hover:bg-gray-600 active:bg-gray-600 transition-all duration-200 ease-in-out`"
            @click="addNewDevise"
        >
            <Plus class="h-8 w-8 mb-4" />
            <div class="text-sm flex justify-center">Добавить новое устройство</div>
        </div>
    </div>
</template>
