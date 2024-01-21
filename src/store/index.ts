import { InjectionKey } from "vue";
import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { SHOW_NOTIFICATION } from "./mutationsType";
import INotification from "@/interfaces/INotification";
import { StateProject, projectModule } from "./modules/project";
import { taskModule, StateTask } from './modules/task'

export interface State {
  notifications: INotification[],
  task: StateTask,
  project: StateProject
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    notifications: [],
    task: {
      tasks: []
    },
    project: {
      projects: []
    }
  },
  mutations: {
    [SHOW_NOTIFICATION](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()
      state.notifications.push(newNotification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(notify => notify.id != newNotification.id)
      }, 3000)
    }
  },
  modules: {
    projectModule,
    taskModule
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}