<script setup lang="ts">
interface PopupItem {
    title: string;
    action: () => void;
}

interface PopupProps {
    id?: string;
    listClasses?: string;
    itemClasses?: string;
    itemList: PopupItem[];
}

const props = defineProps<PopupProps>();
</script>
<template>
    <div class="popup-list absolute top-0 right-0 shadow-sm/30" :class="props.listClasses">
        <ul>
            <li
                v-for="(item, index) in props.itemList"
                :key="index"
                class="px-2 py-1 rounded-sm cursor-pointer hover:bg-gray-600 active:bg-gray-600 transition-all duration-200 ease-in-out"
                :class="itemClasses"
                @click="item.action"
            >
                {{ item.title }}
            </li>
        </ul>
    </div>
</template>
