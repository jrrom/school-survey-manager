<script setup lang="ts">

const props = defineProps<{
  image: string,
  size: number,
}>()

</script>


<template>
  <button type="button">
    <img :src="image" rel="preload" class="hover:cursor-pointer p-1" 
         :width="size" :height="size" />
  </button>
</template>