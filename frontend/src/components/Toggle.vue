<script setup lang="ts">

import { usePanelStore } from '@/stores/pinia';
import type { stringifyQuery } from 'vue-router';
const panelStore = usePanelStore();

const props = defineProps<{
  name: string,
  image: string,
  fillImage: string,
  size: number 
}>()

</script>


<template>
  <div class="flex flex-col items-center wh-fit text-white text-2xl"
       @click="panelStore.setCurrentPanelPage(name)">
    <img :src="image" rel="preload" class="hover:cursor-pointer" 
         v-show="panelStore.getCurrentPanelPage() !== name"
         :width="size" :height="size" />
    <img :src="fillImage" rel="preload" class="hover:cursor-pointer"
         v-show="panelStore.getCurrentPanelPage() === name"
         :width="size" :height="size" />
    <button> {{ name }} </button>
  </div>
</template>