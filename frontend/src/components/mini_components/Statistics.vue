<script lang="ts" setup>

import { useStatisticsStore, useSurveyStore } from "@/stores/pinia";
import type { Options } from "@/stores/survey"
import IconButton from "../IconButton.vue"
const statisticsStore  = useStatisticsStore();
const surveyStore      = useSurveyStore();
const options          = (await surveyStore.getOptions(statisticsStore.surveyId))?.data;
const survey: any      = (await surveyStore.getSurvey(statisticsStore.surveyId))?.data;
const sections         = (JSON.parse(survey.value)).itemList;
console.log(sections[0].options)

function getImage(option: any) {
  let hi = ((JSON.parse(option.survey.value)).itemList.filter((x: any, y: any) => {
    if (x.options.some((x: any) => x.id === option.id)) {
      return x
    }
  }))[0].options.filter((x: any, y: any) => {
    if (x.id === option.id) {
      return x
    }
  })[0].image

  if (hi === "") {
    return "Image not given."
  } else {
    return hi;
  }
}

</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="bg-gray-100 border-2 border-gray-300 text-4xl mb-4 p-2 flex flex-col">
        <div class="flex flex-row">
          <h1 class="mr-8 decoration-sky-300 underline-offset-4 underline"> 
            Statistics 
          </h1>
          <IconButton image="x.svg" :size="30" class="bg-rose-400 rounded-lg" 
                      @click="statisticsStore.clear()" />
        </div>
        <h1 class="text-2xl text-gray-600">
          Title: {{ survey.title }} <br>
          I.D  : {{ survey.id }}    
        </h1>
      </div>
      <div v-for="section in sections">
        <h3 class="bg-gray-100 border-2 border-gray-300 text-3xl p-2">
          <span class=" underline underline-4 decoration-2 decoration-sky-300">
            Section:</span> {{ section.title }} <br>
          <span class=" underline underline-4 decoration-2 decoration-sky-300">
            Type:</span> {{ section.type }} <br>
        </h3>
        <div v-for="option in options" class="border-2 border-sky-300">
          <span v-if="section.title === option.section">
            <p class="bg-sky-100 border-y-2 border-sky-300 p-2 -mt-2"> Title: {{ option.title }}</p> 
            <p class="bg-white pl-2 pt-4"> I.D: <span class="text-gray-600 text-sm"> {{ option.id }} </span></p> 
            <p class="bg-white pl-2"> Image: 
              {{ getImage(option) }} 
            </p> 
            <p class="bg-white pl-2 pb-4"> Votes: {{ option.value }}</p> 
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
