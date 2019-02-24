/*
|-------------------------------------------------------------------------------
| VUEX modules/users.js
|-------------------------------------------------------------------------------
| The Vuex data store for the users
*/

import UserAPI from '../api/user.js';
// import  axios  from 'axios'
import router from '../routes.js'


const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}


export const users = {

    state: {
        user: {},
        hasPassword: true,
        firstPassword: '',
        newUser: {},
        logged: !!window.localStorage.getItem('token'),
        token: localStorage.getItem('token') || '',
        userWithoutPass: '',
        user_id: 0
    },


    actions: {

        loginUser({commit}, data) {

            let token = readCookie('access');

            console.log(token)

            UserAPI.getLoginUser(data, token)
                .then(function (response) {
                    commit(types.LOGIN)
                    window.localStorage.setItem('token', response.data.data.token)
                    window.localStorage.setItem('userId', response.data.data.user.id)
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.token
                    router.push('main')
                })

        },

        loadUserWithoutPass({commit}) {
            let token = readCookie('access');


            UserAPI.getUserWithoutPass(token)
                .then(function (response) {
                    commit('setuserWithoutPass')
                })
        },

        logoutUser({commit}) {
            let token = window.localStorage.getItem('token')
            UserAPI.logoutUser(token)
                .then(function () {
                        commit(types.LOGOUT)
                        window.localStorage.removeItem('token')
                        window.localStorage.removeItem('userId')
                        delete axios.defaults.headers.common['Authorization']
                        router.push('/')
                    }
                )
        },

        loadUser({commit}) {

            let token = window.localStorage.getItem('token');

            UserAPI.getUser(token)
                .then(function (response) {
                    commit('setUser', response.data.user);
                })
                .catch(function () {
                    commit('setUser', {});
                });
        },

        loadID({commit}) {
            let token = window.localStorage.getItem('token');

            return new Promise((resolve, reject) => {
                UserAPI.loadID(token)
                    .then(
                        response => {
                            console.log(response);
                            commit('setID', response.data);
                            resolve(response)
                        }, error => {
                            reject(error)
                        }
                    )
            })
        }
    },


    mutations: {
        [types.LOGIN](state) {
            state.logged = true
        },

        [types.LOGOUT](state) {
            state.logged = false
        },

        setUser(state, user) {
            state.user = user;
        },

        setHasPassword(state, value) {
            state.hasPassword = value;
        },

        setFirstPassword(state, firstPassword) {
            state.firstPassword = firstPassword
        },

        setNewUser(state, newUser) {
            state.newUser = newUser
        },
        setToken(state, nToken) {
            state.token = nToken
        },
        setuserWithoutPass(state, userWithoutPass) {
            state.userWithoutPass = userWithoutPass
        },
        setID: (state, id) => state.user_id = id


    },


    getters: {

        getUser(state) {
            return state.user;
        },

        getUserID: state => state.user.id,

        getHasPassword(state) {
            return state.hasPassword;
        },
        getFirstPassword(state) {
            return state.firstPassword;
        },
        getNewUser(state) {
            return state.newUser;
        },
        isLogged: state => state.logged,

        getToken: state => state.token,

        getuserWithoutPass: state => state.userWithoutPass,

        getID: state => state.user_id

    }
}