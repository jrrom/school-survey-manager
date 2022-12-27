<script setup lang="ts">

import { usePanelStore, useAdminStore, useStudentStore, useFilterStore, useSurveyStore } from '@/stores/pinia';
import { ref, type Ref } from 'vue';
import IconButton from '../IconButton.vue';
const panelStore   = usePanelStore();
const adminStore   = useAdminStore();
const studentStore = useStudentStore();
const surveyStore  = useSurveyStore();
const filterStore  = useFilterStore();

function filterAdmins(event: Event) {
  //@ts-ignore
  let { search } = Object.fromEntries(new FormData(event.target));
  search = search.trim();
  adminStore.filterAdmin(admin => admin.user.includes(search));
  (document.getElementById("form") as HTMLFormElement).reset()
}

function filterSurveys(event: Event) {
  //@ts-ignore
  let { search } = Object.fromEntries(new FormData(event.target));
  search = search.trim();
  //@ts-ignore
  surveyStore.filterSurvey(survey => survey.title.includes(search));
  (document.getElementById("form") as HTMLFormElement).reset()
}

function filterStudents(event: Event) {
  //@ts-ignore
  let { id, name, class_, section} = Object.fromEntries(new FormData(event.target));
  [id, name, class_, section] = [id.trim(), name.trim(), class_.trim(), section.trim()];
  studentStore.filterStudent(student => student.id.includes(id));
  studentStore.filterStudent(student => student.name.includes(name)); 
  studentStore.filterStudent(student => student.class_.includes(class_));
  studentStore.filterStudent(student => student.section.includes(section)); 
  (document.getElementById("form") as HTMLFormElement).reset()
}

function closeFilter(): void {
  filterStore.toggleActive();
  if (panelStore.currentPanelPage === "Admins") adminStore.getAdmins()
  else if (panelStore.currentPanelPage === "Students") studentStore.getStudents()
  else surveyStore.getSurveys();
}

let enabled: Ref<boolean> = ref(false)
function enableDrag(): void {
  if (enabled.value) { return };
  enabled.value = true;
  const form = document.querySelector("#form") as HTMLElement;
  function onDragMouse(event: MouseEvent){ 
    let getStyle = window.getComputedStyle(form);
    let left = parseInt(getStyle.left);
    let top  = parseInt(getStyle.top);
    form.style.left = `${left + event.movementX}px`
    form.style.top  = `${top + event.movementY}px`
  };
  form.addEventListener("mousedown", () => {
    form.addEventListener("mousemove", onDragMouse);
  });
  form.addEventListener("mouseup", () => {
    form.removeEventListener("mousemove", onDragMouse);
  });
  form.addEventListener("mouseleave", () => {
    form.removeEventListener("mousemove", onDragMouse);
  });
}

</script>

<template>
  <!-- Desktop: (ADMINS) -->
  <div class="right-0 fixed w-20 hidden lg:flex lg:flex-col items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Admins'">
    <form class="fixed w-96 right-0 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @mouseenter="enableDrag"
          @submit.prevent="filterAdmins">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        Search:
      </label>
      <input size="1" type="text" name="search" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter user name" />
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="closeFilter" />
      </div>
    </form>
  </div>
  <!-- Mobile: (ADMINS) -->
  <div class="fixed w-screen h-screen bg-white flex flex-col lg:hidden items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Admins'">
    <p class="p-4 w-full text-3xl bg-gray-100 font-semibold tracking-wide text-left border-b-2 border-gray-200">
      Filter Admins
    </p>
    <form class="w-5/6 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @submit.prevent="filterAdmins">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Search:
      </label>e
      <input size="1" type="text" name="search" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter user name."/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="filterStore.toggleActive" />
      </div>
    </form>
  </div>
  <!-- Desktop: (STUDENTS) -->
  <div class="right-0 fixed w-20 hidden lg:flex lg:flex-col items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Students'">
    <form class="fixed w-96 right-0 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @mouseenter="enableDrag"
          @submit.prevent="filterStudents">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        Search:
      </label>
      <input size="1" type="text" name="id" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter id" />
      <input size="1" type="text" name="name" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter name" />
      <input size="1" type="text" name="class_" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter class" />
      <input size="1" type="text" name="section" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter section" />
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="closeFilter" />
      </div>
    </form>
  </div>
  <!-- Mobile: (STUDENTS) -->
  <div class="fixed w-screen h-screen bg-white flex flex-col lg:hidden items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Students'">
    <p class="p-4 w-full text-3xl bg-gray-100 font-semibold tracking-wide text-left border-b-2 border-gray-200">
      Filter Students 
    </p>
    <form class="w-5/6 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @submit.prevent="filterStudents">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Search:
      </label>
      <input size="1" type="text" name="id" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter id"/>
      <input size="1" type="text" name="name" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter name"/>
      <input size="1" type="text" name="class_" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter class"/>
      <input size="1" type="text" name="section" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter section"/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="filterStore.toggleActive" />
      </div>
    </form>
  </div>
  <!-- Desktop: (SURVEYS) -->
  <div class="right-0 fixed w-20 hidden lg:flex lg:flex-col items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Surveys'">
    <form class="fixed w-96 right-0 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @mouseenter="enableDrag"
          @submit.prevent="filterSurveys">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        Search:
      </label>
      <input size="1" type="text" name="search" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter title" />
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="closeFilter" />
      </div>
    </form>
  </div>
  <!-- Mobile: (SURVEYS) -->
  <div class="fixed w-screen h-screen bg-white flex flex-col lg:hidden items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Surveys'">
    <p class="p-4 w-full text-3xl bg-gray-100 font-semibold tracking-wide text-left border-b-2 border-gray-200">
      Filter Surveys 
    </p>
    <form class="w-5/6 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @submit.prevent="filterSurveys">
      <label for="search" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Search:
      </label>
      <input size="1" type="text" name="search" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter title"/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="search.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="filterStore.toggleActive" />
      </div>
    </form>
  </div>
</template>