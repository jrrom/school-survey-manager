<script setup lang="ts">

import IconButton from './IconButton.vue';
import Statistics from './mini_components/Statistics.vue';
import { useStatisticsStore, useSurveyCreateStore, useSurveyStore } from '@/stores/pinia';
import InputElement from './mini_components/InputElement.vue';
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import * as survey from "../stores/survey";
const surveyStore       = useSurveyStore();
const createSurveyStore = useSurveyCreateStore();
const statisticsStore   = useStatisticsStore();

function removeInputElement(index: number) {
  createSurveyStore.removeInputElement(index);
}

onUnmounted(() => {
  createSurveyStore.clear();
})

async function submit(event: Event): Promise<void> {
  await surveyStore.createSurvey(createSurveyStore.images, createSurveyStore.title, createSurveyStore.survey.getJson());
  createSurveyStore.clear();
  createSurveyStore.active = false;
  surveyStore.getSurveys()
}
</script>

<template>
  <div>
    <!-- Desktop -->
    <table class="w-full hidden md:inline-table"
           v-if="!createSurveyStore.getActive() && !statisticsStore.getActive()">
      <thead class="bg-gray-100 border-b-4 border-gray-300">
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> ID </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Title </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Statistics </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-center"> Delete </th>
      </thead>
      <tr v-for="survey, index in surveyStore.surveysArray" 
          class="border-b-2 border-gray-200"
          :class="index % 2 ? 'bg-white' : 'bg-gray-100'">

        <td class="p-3 text-xl w-48"> 
          <p class="h-full w-full">
            {{ survey.id }} 
          </p>
        </td>

        <td class="p-3 text-xl"> 
          <p class="w-full h-full overflow-auto whitespace-nowrap">
            {{ survey.title }} 
          </p>
        </td>
        
        <td class="p-3 w-16 text-center">
          <IconButton image="eye-fill.svg" :size="30" class="bg-cyan-400 rounded-lg" 
                      @click="statisticsStore.setActive(true, survey.id)" />
        </td>

        <td class="p-3 w-16 text-center"> 
          <IconButton image="trash.svg" :size="30" class="bg-rose-400 rounded-lg" 
                      @click="surveyStore.deleteSurvey(survey.id)" /> 
        </td>

      </tr>
    </table>
    <!-- Mobile -->
    <div class="w-full block md:hidden"
         v-if="!createSurveyStore.getActive() && !statisticsStore.getActive()" >
      <div v-for="survey, index in surveyStore.surveysArray"
          class="bg-white mb-8 rounded-lg shadow flex flex-col">

        <div class="p-3 text-xl w-full"> 
          <p class="w-full h-full">
            {{ survey.id }} 
          </p>
        </div>

        <div class="p-3 text-xl w-full bg-gray-100"> 
          <p class="w-full">
            {{ survey.title }} 
          </p>
        </div>

        <div class="p-3 text-center"> 
          <IconButton image="eye-fill.svg" :size="40" class="bg-cyan-400 rounded-lg" 
                      @click="statisticsStore.setActive(true, survey.id)"
          /> 
          <IconButton image="trash.svg" :size="40" class="ml-4 bg-rose-400 rounded-lg" 
                      @click="surveyStore.deleteSurvey(survey.id)"
          /> 
        </div>
      </div>
    </div>
    <!-- Create -->
    <form class=""
          @submit.prevent="submit"
          v-if="createSurveyStore.active">
      <div class="w-full">
        <input placeholder="Enter your title here." 
               v-model="createSurveyStore.title"
               required
               class="w-full border-t-2 border-gray-300 p-2 decoration-sky-400
                     focus:outline-none" />
      </div>
      <ul>
        <li v-for="inputElement, index in createSurveyStore.survey.itemList" class="flex flex-row">
          <InputElement :order="index" />
          <IconButton image="trash.svg" :size="40" class="mt-6 bg-rose-400 rounded-lg absolute -ml-16" 
                      @click="removeInputElement(index)"/>
        </li>
      </ul>
      <IconButton image="pencil.svg" :size="40" class="bg-lime-400 rounded-lg mt-4 ml-4" 
                  @click="createSurveyStore.addInputElement(new survey.FormCheckbox('', []))" 
      />
      <br />
      <button type="submit" class="bg-lime-400 rounded-lg shadow ml-4 mt-20 font-semibold text-white p-3">
        Submit
      </button>
    </form>

    <Statistics v-if="statisticsStore.getActive()" />
  </div>
</template>