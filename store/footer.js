import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const footer = {
	state: {
		tab: ''
	},
	mutations: {
		SET_TAB: (state, data) => {
			state.tab = data
		}
	},
	getters: {
		footerTab: state => state.tab
	}
}

export default footer;
