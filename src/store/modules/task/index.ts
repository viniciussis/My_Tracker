import httpClient from "@/http"
import ITask from "@/interfaces/ITask"
import { State } from "@/store"
import { GET_TASKS, REGISTER_TASK, UPDATE_TASK } from "@/store/actionsType"
import { ADD_TASK, EDIT_TASK, SET_TASKS } from "@/store/mutationsType"
import { Module } from "vuex"

export interface StateTask {
  tasks: ITask[]
}

export const taskModule: Module<StateTask, State> = {
  state: {
    tasks: []
  },
  mutations: {
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
}
