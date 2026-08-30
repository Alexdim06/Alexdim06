import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ResumeView from './views/ResumeView.vue';

const base = import.meta.env.BASE_URL;

export const router = createRouter({
  history: createWebHistory(base),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/resume', name: 'resume', component: ResumeView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});
