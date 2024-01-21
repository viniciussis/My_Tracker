import ProjectsForm from "@/views/Projects/ProjectsForm.vue"
import ProjectsView from "../views/ProjectsView.vue"
import TasksView from "../views/TasksView.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import ProjectsList from "@/views/Projects/ProjectsList.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tasks',
    component: TasksView
  },
  {
    path: '/projects',
    component: ProjectsView,
    children: [
      {
        path: '',
        name: 'Projects List',
        component: ProjectsList
      },
      {
        path: 'new',
        name: 'New Project',
        component: ProjectsForm
      },
      {
        path: ':id',
        name: 'Edit Project',
        component: ProjectsForm,
        props: true
      },
    ],
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router