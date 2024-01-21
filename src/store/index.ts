import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, DELETE_PROJECT, EDIT_PROJECT, EDIT_TASK, SET_PROJECTS, SET_TASKS, SHOW_NOTIFICATION } from "./mutationsType";
import INotification from "@/interfaces/INotification";
import ITask from "@/interfaces/ITask";
import IProject from "@/interfaces/IProject";
import httpClient from "@/http";
import { GET_PROJECTS, REGISTER_PROJECT, UPDATE_PROJECT, EXCLUDE_PROJECT, GET_TASKS, REGISTER_TASK, UPDATE_TASK } from "./actionsType";

export interface State {
  notifications: INotification[],
  tasks: ITask[]
  projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    notifications: [],
    tasks: [],
    projects: []
  },
  mutations: {
    [SHOW_NOTIFICATION](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(notify => notify.id != newNotification.id)
      }, 3000)
    },
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName
      } as IProject
      state.projects.push(project)
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex(proj => proj.id == project.id)
      state.projects[index] = project
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(proj => proj.id != id)
    },
    [SET_PROJECTS](state, projects: IProject[]) {
      state.projects = projects
    },
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task)
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex(selectedTask => selectedTask.id == task.id)
      state.tasks[index].description = task.description
    },
    [SET_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks
    }
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      httpClient.get('projects')
        .then(response => commit(SET_PROJECTS, response.data))
    },
    [REGISTER_PROJECT](contexto, projectName: string) {
      return httpClient.post('/projects', {
        name: projectName
      })
    },
    [UPDATE_PROJECT](contexto, project: IProject) {
      return httpClient.put(`/projects/${project.id}`, project)
    },
    [EXCLUDE_PROJECT]({ commit }, id: string) {
      return httpClient.delete(`/projects/${id}`)
        .then(() => commit(DELETE_PROJECT, id))
    },
    [GET_TASKS]({ commit }) {
      httpClient.get('tasks')
        .then(response => commit(SET_TASKS, response.data))
    },
    [REGISTER_TASK]({ commit }, task: ITask) {
      return httpClient.post('/tasks', task)
        .then(response => commit(ADD_TASK, response.data))
    },
    [UPDATE_TASK]({ commit }, task: ITask) {
      return httpClient.put(`/tasks/${task.id}`, task)
        .then(() => commit(EDIT_TASK, task))
    }
  }

})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}