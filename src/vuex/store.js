import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const defaultState = {
	topics: [],
	count: 0,
	pageIndex: 1,
	hasmore: true,
	artile: {},
	comments: []
}

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
	TOPICS_LIST: (state, topics) => {
		if (topics.length < 10) {
			state.hasmore = false;
		}
		state.topics = state.topics.concat(topics);
	},
	ARTICLE: (state, article) => {
		state.article = article;
	},
	COMMENTS: (state, comments) => {
		state.comments = comments;
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})
