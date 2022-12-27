import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Panel from "../views/Panel.vue";
import { useJwtStore } from "../stores/pinia";
import Surve from "../views/Surve.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/panel",
      name: "panel",
      component: Panel,
      meta: { auth: false }
    },
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { auth: false }
    },
    {
      path: "/surveys/:pathMatch(.*)*",
      name: "surveys",
      component: Surve,
      meta: { auth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: "/",
      meta: { auth: false }
    }
  ]
});

// Vue Guard
router.beforeEach((to, from, next) => {
  const jwtStore = useJwtStore()

  if (to.meta.auth) {
    if (jwtStore.hasJwt()) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
})

export default router;
