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

export const getArticle = ({ commit, state }, { id }) => {
	state.comments = [];
	state.article = {};
	request.get('/comments?comment_POST_ID=' + id).then((response) => {
		if (response.statusText === 'OK') {
			commit('COMMENTS', response.data);
		}
	}).catch((error) => {
		console.log(error);
	})
	return request.get('/posts?ID=' + id).then((response) => {
		if (response.statusText === 'OK') {
			commit('ARTICLE', response.data.length > 0 ? response.data[0] : {})
		}
	}).catch((error) => {
		console.log(error)
	})
}