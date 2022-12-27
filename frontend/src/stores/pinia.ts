import type { Axios } from "axios";
import { defineStore } from "pinia";
import { inject, toRaw } from "vue";
import * as s from "./survey"

const useJwtStore = defineStore({
  id: "jwt",
  state: () => ({
    jwt: ""
  }),
  actions: {
    setJwt(givenJwt: string): void {
      this.jwt = givenJwt;
    },
    getJwt(): string {
      return this.jwt;
    },
    hasJwt(): boolean {
      if (this.jwt != "") {
        return true;
      } else {
        return false;
      }
    },
    getHeader() {
      return {
        headers: {
          "Authorization": `Bearer ${this.jwt}`
        }
      }
    }
  }
})

const usePanelStore = defineStore({
  id: "panel",
  state: () => ({
    currentPanelPage: "",
    adminEditStore: useAdminEditStore(),
    studentEditStore: useStudentEditStore(),
    createStore: useCreateStore(),
    filterStore: useFilterStore()
  }),
  actions: {
    setCurrentPanelPage(page: string): void {
      this.currentPanelPage = page;
      this.adminEditStore.reset();
      this.studentEditStore.reset();
      this.createStore.setActive(false);
      this.filterStore.setActive(false);
    },
    getCurrentPanelPage(): string {
      return this.currentPanelPage;
    },
  }
})

interface Admin {
  user: string,
  email: string,
  password: string,
}
const useAdminStore = defineStore({
  id: "admins",
  state: () => ({
    adminsArray: [] as Admin[],
    axios: inject("axios") as Axios,
    jwtStore: useJwtStore(),
    adminEditStore: useAdminEditStore()
  }),
  actions: {
    async getAdmins(): Promise<void> {
      return this.axios
      .get(window.location.origin + "/api/admins", this.jwtStore.getHeader())
      .then(res => { this.adminsArray = res.data })
      .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async editAdmin
    (
      oldUser : string, 
      newUser : string, 
      email: string,
      password: string
    ): Promise<void> {
      return this.axios
      .patch(
        window.location.origin + "/api/admins",
        { "oldUser" : oldUser,
          "newUser" : newUser,
          "email" : email,
          "password": password },
        this.jwtStore.getHeader(),
      )
      .then(res => {
        console.log(res);
        this.adminsArray.forEach((element, index) => {
          if(element.user === oldUser) {
            this.adminEditStore.removeFromIndexes(index);
            element.user = newUser;
            element.email = email;
            element.password = password;
          }
      });
        this.adminsArray.sort((a,b) => a.user > b.user ? 1 : -1);
       })
        .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async deleteAdmin(user: string): Promise<void> {
      return this.axios
        .delete(
          window.location.origin + "/api/admins",
          {
            headers: {
              Authorization: this.jwtStore.getHeader().headers.Authorization
            },
            data: {
                "users": [user]
            }
          }
        )
        .then(res => {
          console.log(res);
          this.adminsArray = this.adminsArray.filter(x => x.user !== user);
        })
        .catch(err => {
          alert(err.response.data.message);
          console.error(err);
        });
    },

    async createAdmin(user: Admin): Promise<void> {
      if (this.adminsArray.some(admin => admin.user === user.user)) {
        alert("This user already exists!");
        return;
      }

      return this.axios
      .post(
        window.location.origin + "/api/admins/create",
        {
          user: user.user,
          email: user.email,
          password: user.password 
        },
        this.jwtStore.getHeader()
      )
      .then(res => {
        console.log(res);
        this.adminsArray.push({
          user: user.user,
          email: user.email,
          password: user.password 
        });
        this.adminsArray.sort((a,b) => a.user > b.user ? 1 : -1);
      })
      .catch(err => {
         alert(err.response.data.message);
         console.error(err);
      });
    },

    async filterAdmin(fn: (a: Admin) => boolean): Promise<void> {
      this.adminsArray = this.adminsArray.filter(fn);
    },
  }
})

interface Student {
  id: string,
  name: string,
  class_: string,
  section: string
}
const useStudentStore = defineStore({
  id: "students",
  state: () => ({
    studentsArray: [] as Student[],
    axios: inject("axios") as Axios,
    jwtStore: useJwtStore(),
    studentEditStore: useStudentEditStore()
  }),
  actions: {
    async getStudents(): Promise<void> {
      return this.axios
      .get(window.location.origin + "/api/students", this.jwtStore.getHeader())
      .then(res => { this.studentsArray = res.data })
      .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async editStudent
    (
      oldId  : string, 
      newId  : string, 
      name   : string,
      class_ : string,    // class_ because TypeScript won't allow class as a parameter name.
      section: string
    ): Promise<void> {
      return this.axios
      .patch(
        window.location.origin + "/api/students",
        { "oldId"  :  oldId,
          "newId"  :  newId,
          "name"   :   name,
          "class_"  : class_,
          "section": section
        },
        this.jwtStore.getHeader(),
      )
      .then(res => {
        console.log(res);
        this.studentsArray.forEach((element, index) => {
          if(element.id === oldId) {
            this.studentEditStore.removeFromIndexes(index);
            element.id      = newId;
            element.name    = name;
            element.class_   = class_;
            element.section = section;
          }
      });
        this.studentsArray.sort((a,b) => a.name > b.name ? 1 : -1);
       })
        .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async deleteStudent(id: string): Promise<void> {
      return this.axios
        .delete(
          window.location.origin + "/api/students",
          {
            headers: {
              Authorization: this.jwtStore.getHeader().headers.Authorization
            },
            data: {
                "ids": [id]
            }
          }
        )
        .then(res => {
          console.log(res);
          this.studentsArray = this.studentsArray.filter(x => x.id !== id);
        })
        .catch(err => {
          alert(err.response.data.message);
          console.error(err);
        });
    },

    async createStudent(user: Student): Promise<void> {
      if (this.studentsArray.some(student => student.id === user.id)) {
        alert("This user already exists!");
        return;
      }
      console.log(user);
      return this.axios
      .post(
        window.location.origin + "/api/students/create",
        {
          id: user.id,
          name: user.name,
          class_: user.class_,
          section: user.section
        },
        this.jwtStore.getHeader()
      )
      .then(res => {
        console.log(res);
        this.studentsArray.push({
          id: user.id,
          name: user.name,
          class_: user.class_,
          section: user.section
        });
        this.studentsArray.sort((a,b) => a.name > b.name ? 1 : -1);
      })
      .catch(err => {
         alert(err.response.data.message);
         console.error(err);
      });
    },

    async filterStudent(fn: (a: Student) => boolean): Promise<void> {
      this.studentsArray = this.studentsArray.filter(fn);
    },
  }
})

interface Survey {
  id: string,
  title: string,
  value: string,
}
const useSurveyStore = defineStore({
  id: "surveys",
  state: () => ({
    surveysArray: [] as Survey[],
    axios: inject("axios") as Axios,
    jwtStore: useJwtStore(),
  }),
  actions: {
    async getSurveys(): Promise<void> {
      return this.axios
      .get(window.location.origin + "/api/surveys", this.jwtStore.getHeader())
      .then(res => { this.surveysArray = res.data })
      .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async getOptions(id: string) {
      return this.axios
      .get(window.location.origin + "/api/surveys/" + id + "/options", this.jwtStore.getHeader())
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
    },

    async getSurvey(id: string) {
      return this.axios
      .get(window.location.origin + "/api/surveys/" + id, this.jwtStore.getHeader())
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      })
    },

    async submitSurvey(studentId: string, optionsId: string[], surveyId: string): Promise<void> {
      console.log("studentId ", studentId);
      console.log("optionsId ", optionsId);
      console.log("surveyId"  , surveyId);
      return this.axios
      .post(window.location.origin + "/api/surveys/submit", { "surveyId": surveyId, "optionIds": optionsId, "studentId": studentId })
      .then(res => { this.surveysArray = res.data })
      .catch(err => {
        alert(err.response.data.message);
        console.error(err);
      });
    },

    async deleteSurvey(id: string): Promise<void> {
      return this.axios
        .delete(
          window.location.origin + "/api/surveys",
          {
            headers: {
              Authorization: this.jwtStore.getHeader().headers.Authorization
            },
            data: {
                "ids": [id]
            }
          }
        )
        .then(res => {
          console.log(res);
          this.surveysArray = this.surveysArray.filter(x => x.id !== id);
        })
        .catch(err => {
          alert(err.response.data.message);
          console.error(err);
        });
    },

    async filterSurvey(fn: (a: Survey) => boolean): Promise<void> {
      this.surveysArray = this.surveysArray.filter(fn);
    },

    async createSurvey(imaged: any[], titled: string, valued: string): Promise<void> {
      let fd = new FormData();
      imaged.map(x => {fd.append("images", x, x.name)});
      return this.axios
      .post(
        window.location.origin + "/api/surveys/",
        {
          title: titled,
          value: valued
        },
        this.jwtStore.getHeader()
      )
      .then(res => {
        console.log(res);
        this.surveysArray.push({
          id: "",
          title: titled,
          value: valued
        });
        this.surveysArray.sort((a,b) => a.title > b.title ? 1 : -1);
        return this.axios
        .post(
          window.location.origin + "/api/surveys/images",
          fd,
          this.jwtStore.getHeader()
        ).then(res => {
          console.log("Grand success.");
        }).catch(err => {
          if (err.response) {
            alert(err.response.data.message);
            console.error(err);
          } else {
            console.log("Mystery error")
            alert(err.response.data.message);
          }
      })
      .catch(err => {
        if (err.response) {
         alert(err.response.data.message);
         console.error(err);
        } else {
          console.log("Mystery error")
        }
      });
    },
)}
}})

const useAdminEditStore = defineStore({
  id: "adminEdit",
  state: () => ({
    indexes: [] as number[],
    newUser: "" as string,
    email: "" as string,
    password: "" as string
  }),
  actions: {
    addToIndex(item: number): void {
      this.indexes.push(item);
    },
    setNewUser(user: string) {
      this.newUser = user;
    },
    setPassword(password: string) {
      this.password = password;
    },
    setEmail(email: string) {
      this.email = email;
    },
    getEmail(): string {
      return this.email;
    },
    getNewUser(): string {
      return this.newUser;
    },
    getPassword(): string {
      return this.password;
    },
    containsIndex(item: number): boolean {
      return this.indexes.some(x => x === item);
    },
    getIndexes(): number[] {
      return this.indexes;
    },
    removeFromIndexes(item: number): void {
      this.indexes = this.indexes.filter(x => x !== item);
    },
    reset(): void {
      this.indexes =[];
      this.newUser = "";
      this.email = "";
      this.password = "";
    }
  }
})

const useStudentEditStore = defineStore({
  id: "studentEdit",
  state: () => ({
    indexes: [] as number[],
    newId: "" as string,
    name: "" as string,
    class_: "" as string,
    section: "" as string
  }),
  actions: {
    addToIndex(item: number): void {
      this.indexes.push(item);
    },
    setNewId(id: string) {
      this.newId = id;
    },
    setName(name: string) {
      this.name = name;
    },
    setClass(class_: string) {
      this.class_ = class_;
    },
    setSection(section: string) {
      this.section = section;
    },
    getNewId(): string {
      return this.newId;
    },
    getName(): string {
      return this.name;
    },
    getClass(): string {
      return this.class_;
    },
    getSection(): string {
      return this.section;
    },
    containsIndex(item: number): boolean {
      return this.indexes.some(x => x === item);
    },
    getIndexes(): number[] {
      return this.indexes;
    },
    removeFromIndexes(item: number): void {
      this.indexes = this.indexes.filter(x => x !== item);
    },
    reset(): void {
      this.indexes =[];
      this.newId = "";
      this.name = "";
      this.class_ = "";
      this.section = "";
    }
  }
})

const useCreateStore = defineStore({
  id: "create",
  state: () => ({
    active: false
  }),
  actions: {
    toggleActive(): void {
      this.active = !this.active;
    },
    getActive(): boolean {
      return this.active;
    },
    setActive(boolean: boolean) {
      this.active = boolean;
    }
  }
})

const useStatisticsStore = defineStore({
  id: "statistics",
  state: () => ({
    active: false,
    surveyId: ""
  }),
  actions: {
    getActive(): boolean {
      return this.active;
    },
    setActive(boolean: boolean, id: string) {
      this.active   = boolean;
      this.surveyId = id;
      console.log(this.active, this.surveyId);
    },
    clear() {
      this.active   = false;
      this.surveyId = "";
    }
  }
})

const useSurveyCreateStore = defineStore({
  id: "surveycreate",
  state: () => ({
    active: false,
    images: [],
    title: "",
    survey: new s.Survey([])
  }),
  actions: {
    toggleActive(): void {
      this.active = !this.active;
    },
    getActive(): boolean {
      return this.active;
    },
    setActive(boolean: boolean) {
      this.active = boolean;
    },
    addInputElement(item: s.Item) {
      this.survey.addItem(item)
    },
    getElement(index: number) {
      return this.survey.itemList[index];
    },
    removeInputElement(index: number) {
      this.survey.itemList.splice(index, 1);
    },
    replaceInputElement(index: number, item: s.Item) {
      this.survey.itemList.splice(index, 1, item);
    },
    clear() {
      this.title  = "";
      this.survey = new s.Survey([]);
    }
  }
})

const useFilterStore= defineStore({
  id: "filter",
  state: () => ({
    active: false
  }),
  actions: {
    toggleActive(): void {
      this.active = !this.active;
    },
    getActive(): boolean {
      return this.active;
    },
    setActive(boolean: boolean) {
      this.active = boolean;
    }
  }
})

export { 
  useJwtStore, usePanelStore, useAdminStore, useAdminEditStore, useStudentEditStore, 
  useCreateStore, useFilterStore, useStudentStore, useSurveyStore, useSurveyCreateStore,
  useStatisticsStore };