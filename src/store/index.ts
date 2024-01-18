import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, SHOW_NOTIFICATION } from "./mutationsType";
import INotification from "@/interfaces/INotification";

interface State {
  projects: IProject[],
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: []
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project = {
        id: new Date().toISOString(),
        name: projectName
      } as IProject
      state.projects.push(project)
    },
    [EDIT_PROJECT](state, project: IProject){
      const index = state.projects.findIndex(proj => proj.id == project.id)
      state.projects[index] = project
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter(proj => proj.id != id)
    },
    [SHOW_NOTIFICATION](state, newNotification: INotification){
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(notify => notify.id != newNotification.id)
      }, 3000)
    }
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}