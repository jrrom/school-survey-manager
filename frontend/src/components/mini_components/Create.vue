<script setup lang="ts">

import { usePanelStore, useCreateStore, useAdminStore, useStudentStore } from '@/stores/pinia';
import { ref, type Ref } from 'vue';
import IconButton from '../IconButton.vue';
const panelStore   = usePanelStore();
const createStore  = useCreateStore();
const adminStore   = useAdminStore();
const studentStore = useStudentStore();

function submitAdmin(event: Event) {
  //@ts-ignore
  let { user, email, password }: { user: string, email: string , password: string } = Object.fromEntries(new FormData(event.target));
  [user, email, password] = [user.trim(), email.trim(), password.trim()];
  adminStore.createAdmin({user, password, email});
  (document.getElementById("form") as HTMLFormElement).reset();
  (document.getElementById("form2") as HTMLFormElement).reset();
}

function submitStudent(event: Event) {
  //@ts-ignore
  let { id, name, class_, section }: {id: string, name: string, class_: string, section: string} = Object.fromEntries(new FormData(event.target));
  [id, name, class_, section] = [id.trim(), name.trim(), class_.trim(), section.trim()];
  studentStore.createStudent({ id, name, class_, section });
  (document.getElementById("form") as HTMLFormElement).reset();
  (document.getElementById("form2") as HTMLFormElement).reset();
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
          @submit.prevent="submitAdmin">
      <label for="user" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        User: 
      </label>
      <input size="1" type="text" name="user" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none" 
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <label for="email" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Email:
      </label>
      <input size="1" type="text" name="email" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <label for="password" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Password:
      </label>
      <input size="1" type="text" name="password" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="check-lg.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="createStore.toggleActive" />
      </div>
    </form>
  </div>
  <!-- Mobile: (ADMINS) -->
  <div class="fixed w-screen h-screen bg-white flex flex-col lg:hidden items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Admins'">
    <p class="p-4 w-full text-3xl bg-gray-100 font-semibold tracking-wide text-left border-b-2 border-gray-200">
      Create Admin
    </p>
    <form class="w-5/6 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form2"
          @submit.prevent="submitAdmin">
      <label for="user" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        User: 
      </label>
      <input size="1" type="text" name="user" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none" 
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <label for="email" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Email:
      </label>
      <input size="1" type="text" name="email" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <label for="password" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Password:
      </label>
      <input size="1" type="text" name="password" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="No symbols (_, -, /, #...etc)" minlength="1" maxlength="64" required/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="check-lg.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="createStore.toggleActive" />
      </div>
    </form>
  </div>
   <!-- Desktop: (STUDENTS) -->
  <div class="right-0 fixed w-20 hidden lg:flex lg:flex-col items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Students'">
    <form class="fixed w-96 right-0 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form"
          @mouseenter="enableDrag"
          @submit.prevent="submitStudent">
      <label for="id" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        ID:
      </label>
      <input size="1" type="text" name="id" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none" 
             placeholder="Enter ID" minlength="1" maxlength="30" required/>
      <label for="name" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Name:
      </label>
      <input size="1" type="text" name="name" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Name" minlength="1" maxlength="64" required/>
      <label for="class_" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Class:
      </label>
      <input size="1" type="text" name="class_" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Class" minlength="1" maxlength="8" required/>
      <label for="section" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Section:
      </label>
      <input size="1" type="text" name="section" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Section:" minlength="1" maxlength="8" required/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="check-lg.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="createStore.toggleActive" />
      </div>
    </form>
  </div>
   <!-- Mobile: (STUDENTS) -->
  <div class="fixed w-screen h-screen bg-white flex flex-col lg:hidden items-center"
       v-if="panelStore.getCurrentPanelPage() === 'Students'">
    <p class="p-4 w-full text-3xl bg-gray-100 font-semibold tracking-wide text-left border-b-2 border-gray-200">
      Create Student 
    </p>
    <form class="w-5/6 h-fit flex flex-col p-4 text-xl bg-gray-100 mt-16 rounded-lg shadow-md border-gray-50 border-2"
          id="form2"
          @mouseenter="enableDrag"
          @submit.prevent="submitStudent">
      <label for="id" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50"> 
        ID:
      </label>
      <input size="1" type="text" name="id" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none" 
             placeholder="Enter ID" minlength="1" maxlength="30" required/>
      <label for="name" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Name:
      </label>
      <input size="1" type="text" name="name" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Name" minlength="1" maxlength="64" required/>
      <label for="class_" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Class:
      </label>
      <input size="1" type="text" name="class_" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Class" minlength="1" maxlength="8" required/>
      <label for="section" class="w-fit p-1.5 text-md font-medium uppercase tracking-wider 
                             text-sky-800 bg-sky-200 rounded-lg bg-opacity-50 mt-10"> 
        Section:
      </label>
      <input size="1" type="text" name="section" class="w-full mt-4 rounded-lg border-2 border-transparent focus:border-2 focus:border-sky-400 focus:outline-none"
             placeholder="Enter Section:" minlength="1" maxlength="8" required/>
      <div class="mt-8">
        <button type="submit" class="bg-lime-400 rounded-lg shadow mr-6">
          <img src="check-lg.svg" rel="preload" class="hover:cursor-pointer p-1" 
               width="40" height="40" />
        </button>
        <IconButton image="x.svg" :size="40" class="bg-rose-400 rounded-lg shadow" 
                    @click="createStore.toggleActive" />
      </div>
    </form>
  </div>
</template>