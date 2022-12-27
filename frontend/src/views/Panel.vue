<script lang="ts" setup>
import Admins from "@/components/Admins.vue";
import Students from "@/components/Students.vue";
import { onMounted } from "vue";
import Toggle from "../components/Toggle.vue"
import { useAdminStore, useStudentStore, usePanelStore, useSurveyStore } from "../stores/pinia"
import RightButtons from "../components/RightButtons.vue"
import Surveys from "../components/Surveys.vue"
const adminStore   = useAdminStore();
const studentStore = useStudentStore();
const panelStore   = usePanelStore();
const surveyStore  = useSurveyStore();
 
onMounted(() => {
  document.body.classList.add
  ("bg-gray-200");
  adminStore.getAdmins();     // Loading admins in advance
  studentStore.getStudents(); // Loading students in advance
  surveyStore.getSurveys();
});

</script>
<template>
  <div class="flex flex-col lg:flex-row bg-gray-200">

    <!-- Side panel -->

    <div class="top-0 lg:sticky self-start lg:min-h-screen flex flex-col 
                items-center w-full lg:w-40 bg-lightpur pb-32 lg:pb-0 mb-16 lg:mb-0">
      <div class="lg:p-3 lg:py-3">
        <img src="logo.png"
             rel="preload"
             class="sticky bg-white rounded-full p-0.5 border-4 border-lightpur object-cover
                    ring ring-offset-4 ring-width-4 ring-white mt-4 w-24 h-24"/>
      </div>
      <!-- Side panel buttons -->
      <Toggle name="Admins" image="person.svg" fillImage="person-fill.svg" class="mt-32" :size="50" />
      <Toggle name="Students" image="book.svg" fillImage="book-fill.svg" class="mt-16" :size="50" />
      <Toggle name="Surveys" image="patch-question.svg" fillImage="patch-question-fill.svg" class="mt-16" :size="50" />
    </div>

    <RightButtons class="mb-16" 
                  v-if="panelStore.getCurrentPanelPage() !== ''" />
    
    <Admins v-if="panelStore.getCurrentPanelPage() === 'Admins'"
            class="px-4 lg:mt-16 lg:mx-16 text-2xl w-full xl:w-1/2" />

    <Students v-if="panelStore.getCurrentPanelPage() === 'Students'"
            class="px-4 lg:mt-16 lg:mx-16 text-2xl w-full xl:w-1/2" />
    <Surveys v-if="panelStore.getCurrentPanelPage() === 'Surveys'"
            class="px-4 lg:mt-16 lg:mx-16 text-2xl w-full xl:w-1/2" />
  </div>
</template>