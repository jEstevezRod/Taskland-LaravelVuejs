/*
|-------------------------------------------------------------------------------
| VUEX modules/projects.js
|-------------------------------------------------------------------------------
| The Vuex data store for the users
*/

import projectAPI from '../api/project.js';


export const projects = {
    state: {
        project: {},
        projectList: [],
        projectName: '',
        projectListbyTeam: [],
        chartDataProjects: [],
        chartDataTasks: []
    },
    actions: {

        newProject: function ({commit}, data) {
            let token = window.localStorage.getItem('token');

            return new Promise((resolve, reject) => {

                projectAPI.addNewProject({data, token})
                    .then(response => {
                        console.log(response.data.message);
                        if (response.data.project.team_id) {
                            commit('addOneProjectToTeamList', response.data.project)
                            commit('addProjectToList', response.data.project)
                        } else commit('addProjectToList', response.data.project);
                        
                        resolve(response)
                    }, error => {
                        console.error(error);
                        reject(error)
                    })
            })

        },

        loadProjects: function ({commit}) {

            let token = window.localStorage.getItem('token');

            return new Promise((resolve, reject) => {

                projectAPI.loadAllProjects(token)
                    .then(response => {
                        commit('setProjectList', response.data.projects);
                        resolve(response)
                    }, error => {
                        reject(error)
                    })
            })

        },

        loadProjectName: function ({commit}, data) {

            let token = window.localStorage.getItem('token');

            return new Promise (((resolve, reject) => {

                projectAPI.getName({data,token})
                    .then( response => {
                        commit('setProjectName', response.data.name);
                        commit('setProject', response.data.project)
                        resolve(response)
                    }, error => {
                        reject(error)
                    })
            }));

        },

        loadProjectsbyTeam: function ({commit}, data) 
        {
            let token = window.localStorage.getItem("token");

            return new Promise ( (resolve, reject) => {

                projectAPI.loadProjectsbyTeam({token, data})
                .then( response => {
                    console.log(response.data.message)
                    commit('addProjectToTeamList', response.data.projects);
                    resolve(response.data)
                }, error => {
                    console.error(error)
                    reject(error)
                })

            } )
        },

        loadProjectsAndTaskChart: function ({commit}, data) {
            
            let token = window.localStorage.getItem("token");

            return new Promise( (resolve, reject) => {

                projectAPI.loadChartData({token, data})
                .then( response => {
                    commit('setChartDataProjects', response.data.labels);
                    commit('setChartDataTasks', response.data.data);
                    resolve(response.data)
                }, error => {
                    reject(error)
                })
            })
        }


    },
    mutations: {
        setProjectList: (state, array) => state.projectList = array,

        addProjectToList: (state, projects) => state.projectList.push(projects),

        addProjectToTeamList: (state, projects) => state.projectListbyTeam = projects,

        addOneProjectToTeamList: (state, project) => state.projectListbyTeam.push(project),

        setProjectName: (state, name) => state.projectName = name,

        setProject: (state, project) => state.project = project,

        setChartDataProjects: (state, data) => state.chartDataProjects = data,

        setChartDataTasks: (state, data) => state.chartDataTasks = data
    },
    getters: {

        getProjectList: (state) => state.projectList,

        getProjectName: (state) => state.projectName,

        getprojectListbyTeam: state => state.projectListbyTeam,

        loadProject: state => state.project,

        getChartDataProj : state => state.chartDataProjects,

        getChartDataTasks : state => state.chartDataTasks


    }

};