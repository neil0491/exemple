import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
  },
  {
    path: '/func',
    name: 'Function',
    component: () => import('../views/newSyntacs.vue'),
  },
  {
    path: '/picker',
    name: 'Picker',
    component: () => import('../views/PickerPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
