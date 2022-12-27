<script setup lang="ts">

import { useAdminStore, usePanelStore, useCreateStore, useFilterStore, useStudentStore, useSurveyStore, useSurveyCreateStore, useStatisticsStore } from '@/stores/pinia';
import IconButton from './IconButton.vue';
import Create from './mini_components/Create.vue';
import Filter from './mini_components/Filter.vue';
const adminStore   = useAdminStore();
const studentStore = useStudentStore();
const panelStore   = usePanelStore();
const createStore  = useCreateStore();
const filterStore  = useFilterStore();
const surveyStore = useSurveyStore();

function print(text: string) {
  console.log(text);
}

const statisticsStore   = useStatisticsStore();
const surveyCreateStore = useSurveyCreateStore();

</script>

<template>
  <!-- Desktop: -->
  <div class="right-0 fixed w-20 hidden lg:flex lg:flex-col items-center"
       v-if="!createStore.getActive() || !filterStore.getActive()">
    <IconButton image="arrow-clockwise.svg" :size="50" class="bg-white border-lightpur border-4 shadow mt-16" 
                @click="panelStore.getCurrentPanelPage() === 'Admins'   ? adminStore.getAdmins()     :
                        panelStore.getCurrentPanelPage() === 'Students' ? studentStore.getStudents() : 
                        surveyStore.getSurveys() "
                v-if="!surveyCreateStore.active && !statisticsStore.active"/>
    <IconButton image="plus.svg" :size="50" class="bg-white border-lightpur border-4 shadow mt-2" 
                @click="panelStore.getCurrentPanelPage() === 'Surveys' ? surveyCreateStore.toggleActive() : createStore.toggleActive()" 
                v-if="!statisticsStore.active"
                />
    <IconButton image="filter.svg" :size="50" class="bg-white border-lightpur border-4 shadow mt-2"
                v-if="!surveyCreateStore.active && !statisticsStore.active"
                @click="filterStore.toggleActive()" />
  </div>
  <!-- Mobile: -->
  <div v-bind="$attrs" class="w-full flex flex-row lg:hidden justify-center">
    <IconButton image="arrow-clockwise.svg" :size="60" class="bg-white border-lightpur border-4 shadow"
                @click="panelStore.getCurrentPanelPage() === 'Admins'   ? adminStore.getAdmins()     :
                        panelStore.getCurrentPanelPage() === 'Students' ? studentStore.getStudents() : 
                        surveyStore.getSurveys()"
                v-if="!surveyCreateStore.active && !statisticsStore.active"/>
    <IconButton image="plus.svg" :size="60" class="bg-white border-lightpur border-4 shadow mx-10"
                @click="panelStore.getCurrentPanelPage() === 'Surveys' ? surveyCreateStore.toggleActive() : createStore.toggleActive()"
                v-if="!statisticsStore.active" />
    <IconButton image="filter.svg" :size="60" class="bg-white border-lightpur border-4 shadow"
                @click="filterStore.toggleActive()"
                v-if="!surveyCreateStore.active && !statisticsStore.active"/>
  </div>
  <Create v-if="createStore.getActive()"/>
  <Filter v-if="filterStore.getActive()"/>
</template>