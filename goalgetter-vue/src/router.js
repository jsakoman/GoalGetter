import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Budgeting from './components/Budgeting.vue'
import Planning from './components/Planning.vue'
import IncomeForm from './components/IncomeForm.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/budgeting', name: 'Budgeting', component: Budgeting },
  { path: '/planning', name: 'Planning', component: Planning },
  { path: '/income', name: 'IncomeForm', component: IncomeForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;