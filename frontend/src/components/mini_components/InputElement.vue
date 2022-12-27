<script setup lang=ts>
  import { useSurveyCreateStore } from "@/stores/pinia";
  import { onMounted, ref, watch, type Ref } from "vue";
  import * as survey from "../../stores/survey"
  import IconButton from "../IconButton.vue"
  import { onUnmounted } from "vue"

  const props = defineProps<{
    order: number,
  }>()

  let surveyCreateStore              = useSurveyCreateStore();
  let inputName: Ref<string>         = ref("")
  watch(inputName, () => {
    surveyCreateStore.getElement(props.order).title = inputName.value;
  })
  let created: Ref<boolean>          = ref(false)

  function inputCreator(type: "FormCheckbox" | "FormRadio") {
    return () => {
      created.value = true;
    }
  }

  function log(text: string) {
    console.log(text);
  }

  let checkbox = inputCreator("FormCheckbox");
  let radio    = inputCreator("FormRadio");

  function createOption() {
    surveyCreateStore.getElement(props.order).addOption(new survey.Options("", ""));
  }

  function fileInput(event: Event, order: number, index: number) {
    // @ts-ignore
    surveyCreateStore.getElement(order).options[index].image = event.target.files[0].name;
    //@ts-ignore
    surveyCreateStore.addImage(event.target.files[0]);
  }
</script>

<template>
  <div class="w-full mt-4 bg-white">
    <div class="flex flex-row h-16">
      <input type="text" size="1" 
                 class="bg-gray-100 w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500 px-2" 
                 minlength="1"
                 maxlength="64"
                 placeholder="Enter name."
                 v-model="inputName"
                 required />
      <select class="bg-gray-100 w-36 text-2xl font-semibold tracking-wide"
              required
              v-model="surveyCreateStore.survey.itemList[order].type">
        <option value=""> Select: </option>
        <option value="checkbox" @click="checkbox"> Checkbox </option>
        <option value="radio"    @click="radio"> Radio </option>
      </select>
    </div>
    <div>
      <ul class="mt-4 ml-4">
        <li v-for="option, index in surveyCreateStore.getElement(order).options" class="flex flex-row mt-4">
          <input type="file" name="image" id="upload" class="w-60" @change="fileInput($event, order, index)" />
          <input type="text" size="1" 
                 class="w-full border-2 border-sky-400 rounded-lg focus:outline-none 
                        pl-2 decoration-sky-500 mx-2" 
                 minlength="1"
                 maxlength="64"
                 v-model="surveyCreateStore.getElement(order).options[index].value"
                 required />  
          <IconButton image="trash.svg" :size="40" class="px-2 mr-2 bg-rose-400 rounded-lg" 
                      @click="surveyCreateStore.getElement(order).options.splice(index, 1)"
          />
        </li>
      </ul>
      <IconButton image="pencil.svg" :size="40" class="bg-lime-400 rounded-lg mt-4 ml-4" 
                  @click="createOption" 
      />
    </div>
  </div>
</template>