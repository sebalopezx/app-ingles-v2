/*
  Router — maps URLs to views.
  Hash history keeps it working on static hosts (GitHub Pages, etc.)
  without extra server config.
*/
import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VerbsView from "../views/VerbsView.vue";
import CalendarView from "../views/CalendarView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/verbs", name: "verbs", component: VerbsView },
  { path: "/calendar", name: "calendar", component: CalendarView },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
