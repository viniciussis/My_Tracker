import IProject from "@/interfaces/IProject";
import { Module } from "vuex";
import { State } from '@/store'
import httpClient from "@/http";
import { GET_PROJECTS, REGISTER_PROJECT, UPDATE_PROJECT, EXCLUDE_PROJECT } from "@/store/actionsType";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, SET_PROJECTS } from "@/store/mutationsType";

export interface StateProject {
  projects: IProject[]
}

export const projectModule: Module<StateProject, State> = {
  mutations: {
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
    }
  }
}