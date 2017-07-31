import request from 'axios'

request.defaults.baseURL = 'http://api.woshuone.com'

export const getTopics = ({ commit, state }) => {
	return request.get('/posts?post_status="publish"').then((response) => {
		if (response.statusText === 'OK') {
			commit('TOPICS_LIST', response.data)
		}
	}).catch((error) => {
		console.log(error)
	})
}

