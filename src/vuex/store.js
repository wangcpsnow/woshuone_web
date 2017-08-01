import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const defaultState = {
  topics: [],
  count: 0,
  pageIndex: 1,
  hasmore: true
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
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
