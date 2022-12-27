<script setup lang="ts">

import IconButton from './IconButton.vue';
import { useAdminStore, useAdminEditStore } from '@/stores/pinia';
const adminStore = useAdminStore();
const adminEditStore  = useAdminEditStore();

</script>

<template>
  <div>
    <!-- Desktop -->
    <table class="w-full hidden md:inline-table">
      <thead class="bg-gray-100 border-b-4 border-gray-300">
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> User </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Email </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-left"> Password </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-center"> Edit </th>
        <th class="p-3 text-2xl font-semibold tracking-wide text-center"> Delete </th>
      </thead>
      <tr v-for="admin, index in adminStore.adminsArray" 
          class="border-b-2 border-gray-200"
          :class="index % 2 ? 'bg-white' : 'bg-gray-100'">

        <td class="p-3 text-xl"> 
          <p class="w-48 h-full overflow-auto"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.user }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-48 focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.user"
                 @input="event => adminEditStore.setNewUser((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 text-xl"> 
          <p class="w-48 h-full overflow-auto"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.email }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-48 focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.email"
                 @input="event => adminEditStore.setEmail((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 text-xl"> 
          <p class="w-48 h-full overflow-auto"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.password }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-48 focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.password"
                 @input="event => adminEditStore.setPassword((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </td>

        <td class="p-3 w-16 text-center"> 
          <IconButton image="pencil.svg" :size="30" class="bg-lime-400 rounded-lg" 
                      v-if="!adminEditStore.containsIndex(index)"
                      @click="adminEditStore.addToIndex(index)" 
          /> 
          <IconButton image="check-lg.svg" :size="30" class=" bg-amber-400 rounded-lg" 
                      v-if="adminEditStore.containsIndex(index)" 
                      @click="adminStore.editAdmin(
                        admin.user, 
                        adminEditStore.getNewUser()  === '' ? admin.user : adminEditStore.getNewUser(), 
                        adminEditStore.getEmail()    === '' ? admin.email : adminEditStore.getEmail(),
                        adminEditStore.getPassword() === '' ? admin.password : adminEditStore.getPassword(), 
                      )" 
          />
        </td>

        <td class="p-3 w-16 text-center"> 
          <IconButton image="trash.svg" :size="30" class="bg-rose-400 rounded-lg" 
                      v-if="!adminEditStore.containsIndex(index)" 
                      @click="adminStore.deleteAdmin(admin.user)" /> 
          <IconButton image="x.svg" :size="30" class="bg-fuchsia-400 rounded-lg" 
                      v-if="adminEditStore.containsIndex(index)"
                      @click="adminEditStore.removeFromIndexes(index)" /> 
        </td>

      </tr>
    </table>
    <!-- Mobile -->
    <div class="w-full block md:hidden">
      <div v-for="admin, index in adminStore.adminsArray" 
          class="bg-white mb-8 rounded-lg shadow flex flex-col">

        <div class="p-3 text-xl w-full"> 
          <p class="w-full h-full overflow-auto"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.user }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.user"
                 @input="event => adminEditStore.setNewUser((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-xl w-full"> 
          <p class="w-full h-full overflow-auto"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.email }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.email"
                 @input="event => adminEditStore.setEmail((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-xl w-full bg-gray-100"> 
          <p class="w-full"
             v-if="!adminEditStore.containsIndex(index)">
            {{ admin.password }} 
          </p>
          <input type="text" size="1" 
                 class="bg-transparent w-full focus:outline-none underline decoration-2 underline-offset-4 decoration-sky-500" 
                 minlength="1"
                 maxlength="64"
                 required
                 :value="admin.password"
                 @input="event => adminEditStore.setPassword((event.target as HTMLInputElement).value.trim())"
                 v-if="adminEditStore.containsIndex(index)" />
        </div>

        <div class="p-3 text-center"> 
          <IconButton image="pencil.svg" :size="40" class="bg-lime-400 rounded-lg" 
                      v-if="!adminEditStore.containsIndex(index)"
                      @click="adminEditStore.addToIndex(index)" 
          /> 
          <IconButton image="check-lg.svg" :size="40" class=" bg-amber-400 rounded-lg" 
                      v-if="adminEditStore.containsIndex(index)" 
                      @click="adminStore.editAdmin(
                        admin.user, 
                        adminEditStore.getNewUser()  === '' ? admin.user : adminEditStore.getNewUser(), 
                        adminEditStore.getEmail()    === '' ? admin.email : adminEditStore.getEmail(), 
                        adminEditStore.getPassword() === '' ? admin.password : adminEditStore.getPassword(), 
                      )" 
          />
          <IconButton image="trash.svg" :size="40" class="ml-4 bg-rose-400 rounded-lg" 
                      v-if="!adminEditStore.containsIndex(index)" 
                      @click="adminStore.deleteAdmin(admin.user)"
          /> 
          <IconButton image="x.svg" :size="40" class="ml-4 bg-fuchsia-400 rounded-lg" 
                      v-if="adminEditStore.containsIndex(index)"
                      @click="adminEditStore.removeFromIndexes(index)" 
          />
        </div>
      </div>
    </div>
  </div>
</template>