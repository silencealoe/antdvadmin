import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import menu from './menu'
Vue.use(Vuex);
let store = new Vuex.Store({
    modules:{
        login,
        menu
    }
});
export default store
