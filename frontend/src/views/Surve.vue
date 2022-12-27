<script setup lang="ts">

import Main from '@/Main.vue';
import { useSurveyStore } from '@/stores/pinia';
import axios from 'axios';
import { onMounted, reactive, ref, type Ref } from 'vue';

let survey      = await axios.get(window.location.href.replace("surveys", "surver")).then(res =>  res.data).catch(err => console.error(err));
let surveyStore = useSurveyStore();
let studentId   = ref()
let main        = JSON.parse(survey.value);
let windowLocation = window.location

function submit(event: Event) {
  //@ts-ignore
  let results    = Object.fromEntries(new FormData(event.target))
  let newResults = {};
  for (let key in results) {
    if (!isNaN(Number(key))) {
      //@ts-ignore
      newResults[results[key]] = "on";
    } else {
      //@ts-ignore
      newResults[key] = results[key];
    }
  }
  let finalResults = [];
  for (let key in newResults) {
    finalResults.push(key);
  }
  console.log(studentId.value, finalResults, window.location.pathname.slice(9))
  surveyStore.submitSurvey(studentId.value, finalResults, window.location.pathname.slice(9))
}
  let repeated = windowLocation.origin + "/static/";
</script>


<template>
  <div class="flex flex-col">
    <img :src="windowLocation.origin + '/logo.png'"
             rel="preload"
             class="static bg-white rounded-full p-0.5 border-4 border-lightpur object-cover
                    ring ring-offset-4 ring-width-4 ring-white mt-10 ml-10 w-24 h-24 z-30"/>
    <img :src="windowLocation.origin + '/8-1.jpg'" class="w-full lg:-mt-72 -z-10" />
    <h1 class="bg-lightpur text-6xl py-5 text-white text-center lg:-mt-20 z-10"> {{ survey.title }}</h1>
  </div>
  <div class="w-full flex flex-col items-center">
    <form class="flex flex-col items-center pt-8 mx-4 px-4 w-full md:w-1/2 lg:w-1/3"
          @submit.prevent="submit">
      <div v-for="item, index in main.itemList" 
          class="flex flex-col w-full pb-4 mb-16 border border-gray-200">
        <h2 class="bg-gray-100 border-gray-300 text-4xl mb-4 p-2"> {{ item.title }} </h2>
        <div v-for="option in item.options"
            class="flex flex-row text-xl pl-4 items-center">
          <img v-if="option.image" :src="repeated + (option.image).replace(/\s/g, '-')" width="64" height="64" class="mr-5 mb-8"/>
          <input v-if="item.type === 'checkbox'" :id="option.id" :type="item.type" :name="option.id" />
          <input v-if="item.type === 'radio'" :id="option.id" :type="item.type" :name="String(index)" :value="option.id" />
          <label :for="option.id" class="ml-2"> <span> {{ option.value }} </span> </label>
        </div>
      </div>
      <input placeholder="Enter student I.D" required v-model="studentId" 
            class="bg-transparent text-2xl w-full px-4 focus:outline-none decoration-2 rounded-full border-2 border-sky-500" />
      <br />
      <button type="submit" 
              class="w-fit p-1.5 text-md font-medium uppercase tracking-wider mb-4 
                  text-lime-800 bg-lime-200 rounded-lg bg-opacity-50 mt-10"> Submit </button>
    </form>
  </div>
</template>