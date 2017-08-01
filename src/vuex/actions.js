import request from 'axios'

request.defaults.baseURL = 'http://api.woshuone.com'

var pageIndex = 0;

export const getTopics = ({ commit, state }) => {
	if (!state.hasmore) {
		return;
	}
	return request.get('/posts?post_status=publish&pageIndex=' + (state.pageIndex++)).then((response) => {
		if (response.statusText === 'OK') {
			commit('TOPICS_LIST', response.data)
		}
	}).catch((error) => {
		console.log(error)
	})
}

