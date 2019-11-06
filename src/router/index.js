import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/block/settings/:id',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../components/left-panel.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
