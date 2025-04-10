import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import IncomeForm from './components/IncomeForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/income',
    name: 'IncomeForm',
    component: IncomeForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;