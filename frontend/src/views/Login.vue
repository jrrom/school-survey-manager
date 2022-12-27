<script lang="ts" setup>
import type { Axios } from "axios";
import { inject, onMounted, onUnmounted, ref, type Ref } from "vue";
import router from "../router/index";
import { useAdminStore, useJwtStore } from "../stores/pinia";

const jwtStore = useJwtStore();

onMounted(() => {
  document.body.classList.add
  ("bg-gradient-to-r", "from-blue-700", "to-lightpur", "min-h-screen");
});

onUnmounted(() => {
  document.body.classList.remove
  ("bg-gradient-to-r", "from-blue-700", "to-lightpur", "min-h-screen");})

const error: Ref<string>        = ref("");
const axios: Axios              = inject("axios") as Axios;

const passwordType: Ref<string> = ref("password");
const show: Ref<boolean>        = ref(false);
const handleShowPassword = (): void => {
  if (show.value === false) {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
  show.value = !show.value;
}

const id: Ref<string>       = ref("");
const password: Ref<string> = ref("");
const adminStore = useAdminStore();
const handleSubmit = (): void => {
  axios.post("/api/admins/login", {
    "user": id.value,
    "password": password.value,
  }).then((response) => {
    jwtStore.setJwt(response.data.access_token);
    router.push("panel");
  }).catch((err) => {
    console.log(err);
    error.value = `${err.message} - ${err.response.data.message}`;
  });
}

</script>

<template>
  <div class="flex flex-col justify-center items-center font text-3xl sm:text-4xl min-h-screen">
    <form @submit.prevent="handleSubmit"
          class="text-white w-3/4 md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center">
      <h1 class="underline mb-12"> Login </h1>
      <input placeholder="ID" v-model="id" class="rounded-full w-full sm:5/6 md:w-3/4 p-3 mb-3 bg-white/20 focus:outline-none">

      <div class="w-full flex justify-center">
        <input placeholder="Password" v-model="password" :type="passwordType"
               class="rounded-full w-full md:w-3/4 sm:5/6 p-3 mb-12 bg-white/20 focus:outline-none">

        <div class="pointer-events-none w-3/4 md:w-1/2 lg:w-1/3 absolute bg-transparent flex justify-center">
          <div class="w-full sm:5/6 md:w-3/4 p-3 flex justify-end items-center bg-transparent">
            <img src="/eye.svg" v-show="!show" @click="handleShowPassword"
                 class="toggleIcon" />
            <img src="/eye-fill.svg" v-show="show" @click="handleShowPassword"
                 class="toggleIcon" />
          </div>
        </div>
      </div>

      <input type="submit" value="Submit" class="rounded-full p-3 w-48 bg-lime-400/60 mb-8">
    </form>
    <div v-show="error" id="errors"
         class="absolute mt-96 w-3/4 sm:w-1/2 p-1 sm:p-3 bg-rose-500/70 text-white justify-center items-center">
      <p class=""> {{ error }} </p>
    </div>
  </div>
</template>