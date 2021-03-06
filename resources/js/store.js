


require('es6-promise').polyfill();


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex );

import { users} from './modules/users'
import { teams } from './modules/teams'
import { tasks} from './modules/tasks'
import { teamMembers } from "./modules/teammembers";
import { projects} from "./modules/projects";
import { projectUsers} from "./modules/projectusers";
import { states} from "./modules/states";
import { assignedTasks} from "./modules/assignedtasks";
import { appointments } from "./modules/appointments"
import { comments } from "./modules/comments"
import { notes } from './modules/notes'
import { files } from './modules/files'

export default new Vuex.Store({
    modules: {
        tasks,
        users,
        teams,
        teamMembers,
        projects,
        projectUsers,
        states,
        assignedTasks,
        appointments,
        comments,
        notes,
        files

    }
});