<script setup lang="ts">

import IconButton from './IconButton.vue';
import { useStudentStore, useStudentEditStore } from '@/stores/pinia';
const studentStore = useStudentStore();
const studentEditStore  = useStudentEditStore();

</script>

<template>
  <div>
    <!-- Desktop -->
    <table class="w-full hidden md:inline-table">
      <thead class="bg-gray-100 border-b-4 border-gray-300">
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> ID </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Name </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Class </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Section </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-center"> Edit </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-center"> Delete </th>
      </thead>
      <tr v-for="student, index in studentStore.studentsArray" 
          class="border-b-2 border-gray-200"
          :class="index % 2 ? 'bg-white' : 'bg-gray-100'">

        <td class="p-3 text-xl w-32"> 
          <p class="h-full w-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.id }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="30"
                 required
                 :value="student.id"
                 @input="event => studentEditStore.setNewId((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 text-xl"> 
          <p class="w-96 h-full overflow-auto"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.name }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-96 focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="student.name"
                 @input="event => studentEditStore.setName((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 text-xl w-20"> 
          <p class="h-full w-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.class_ }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="8"
                 required
                 :value="student.class_"
                 @input="event => studentEditStore.setClass((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 text-xl w-20"> 
          <p class="w-full h-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.section }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="8"
                 required
                 :value="student.section"
                 @input="event => studentEditStore.setSection((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 w-16 text-center"> 
          <IconButton image="pencil.svg" :size="30" class="bg-lime-400 rounded-lg" 
                      v-if="!studentEditStore.containsIndex(index)"
                      @click="studentEditStore.addToIndex(index)" 
          /> 
          <IconButton image="check-lg.svg" :size="30" class=" bg-amber-400 rounded-lg" 
                      v-if="studentEditStore.containsIndex(index)" 
                      @click="studentStore.editStudent(
                        student.id, 
                        studentEditStore.getNewId()   === '' ? student.id : studentEditStore.getNewId(), 
                        studentEditStore.getName()    === '' ? student.name : studentEditStore.getName(), 
                        studentEditStore.getClass()   === '' ? student.class_ : studentEditStore.getClass(), 
                        studentEditStore.getSection() === '' ? student.section : studentEditStore.getSection(), 
                      )" 
          />
        </td>

        <td class="p-3 w-16 text-center"> 
          <IconButton image="trash.svg" :size="30" class="bg-rose-400 rounded-lg" 
                      v-if="!studentEditStore.containsIndex(index)" 
                      @click="studentStore.deleteStudent(student.id)" /> 
          <IconButton image="x.svg" :size="30" class="bg-fuchsia-400 rounded-lg" 
                      v-if="studentEditStore.containsIndex(index)"
                      @click="studentEditStore.removeFromIndexes(index)" /> 
        </td>

      </tr>
    </table>
    <!-- Mobile -->
    <div class="w-full block md:hidden">
      <div v-for="student, index in studentStore.studentsArray" 
          class="bg-white mb-8 rounded-lg shadow flex flex-col">

        <div class="p-3 text-xl w-full"> 
          <p class="w-full h-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.id }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="30"
                 required
                 :value="student.id"
                 @input="event => studentEditStore.setNewId((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-xl w-full bg-gray-100"> 
          <p class="w-full overflow-auto"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.name }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="student.name"
                 @input="event => studentEditStore.setName((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-xl w-full bg-gray-100"> 
          <p class="w-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.class_ }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="8"
                 required
                 :value="student.class_"
                 @input="event => studentEditStore.setName((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-xl w-full bg-gray-100"> 
          <p class="w-full"
             v-if="!studentEditStore.containsIndex(index)">
            {{ student.section }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="8"
                 required
                 :value="student.section"
                 @input="event => studentEditStore.setName((event.target as HTMLInputElement).value.trim())"
                 v-if="studentEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-center"> 
          <IconButton image="pencil.svg" :size="40" class="bg-lime-400 rounded-lg" 
                      v-if="!studentEditStore.containsIndex(index)"
                      @click="studentEditStore.addToIndex(index)" 
          /> 
          <IconButton image="check-lg.svg" :size="40" class=" bg-amber-400 rounded-lg" 
                      v-if="studentEditStore.containsIndex(index)" 
                      @click="studentStore.editStudent(
                        student.id, 
                        studentEditStore.getNewId()   === '' ? student.id      : studentEditStore.getNewId(), 
                        studentEditStore.getName()    === '' ? student.name    : studentEditStore.getName(), 
                        studentEditStore.getClass()   === '' ? student.class_  : studentEditStore.getClass(), 
                        studentEditStore.getSection() === '' ? student.section : studentEditStore.getSection(), 
                      )" 
          />
          <IconButton image="trash.svg" :size="40" class="ml-4 bg-rose-400 rounded-lg" 
                      v-if="!studentEditStore.containsIndex(index)" 
                      @click="studentStore.deleteStudent(student.id)"
          /> 
          <IconButton image="x.svg" :size="40" class="ml-4 bg-fuchsia-400 rounded-lg" 
                      v-if="studentEditStore.containsIndex(index)"
                      @click="studentEditStore.removeFromIndexes(index)" 
          />
        </div>
      </div>
    </div>
  </div>
</template>