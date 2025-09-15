import { createRouter, createWebHistory } from 'vue-router';
import Login from '../../../frontend/src/pages/Login.vue';
import Dashboard from '../../../frontend/src/pages/Dashboard.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
