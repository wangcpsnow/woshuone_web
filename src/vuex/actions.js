import request from 'axios'

var Mdjs = require('md-js');

request.defaults.baseURL = 'http://api.woshuone.com'

var pageIndex = 0;

export const getTopics = ({ commit, state }) => {
	if (!state.hasmore) {
		return;
	}
	return request.get('/posts?post_status=publish&pageIndex=' + (state.pageIndex++)).then((response) => {
		if (response.statusText === 'OK') {
			var res = response.data;
			for (var i=0,l=res.length;i<l;i++) {
				res[i]['post_content'] = Mdjs.md2html(res[i]['post_content']);
			}
			commit('TOPICS_LIST', res)
		}
	}).catch((error) => {
		console.log(error)
	})
}

export const getArticleData = ({ commit, state }, { id }) => {
	return Promise.all([
		getArticle({ commit, state }, { id }),
		getComments({ commit, state }, { id }),
		getArticleTerms({ commit, state }, { id })
	]).then(values => {
		commit('ARTICLE', values[0]);
		commit('COMMENTS', values[1]);
		commit('ARTICLETERMS', values[2]);
	});
}

const getArticle = ({ commit, state }, { id }) => {
	state.article = {};
	return request.get('/posts?ID=' + id).then((response) => {
		if (response.statusText === 'OK') {
			// commit('ARTICLE', response.data.length > 0 ? response.data[0] : {})
			if (response.data.length > 0) {
				var data = response.data[0];
				data.post_content = Mdjs.md2html(data.post_content, {
					alwaysNewline: false
				});
				return data;
			}
			return {};
		}
	}).catch((error) => {
		console.log(error)
	})
}

const getArticleTerms = ({ commit, state }, { id }) => {
	var terms = state.articleTerms[id];
	if (terms) {
		return terms;
	}
	return request.get(`/terms/post/${id}`).then((response) => {
		if (response.statusText === 'OK') {
			return response.data;
		}
	}).catch((error) => {
		console.log(error);
	})
}

const getComments = ({ commit, state }, { id }) => {
	state.comments = [];
	return request.get('/comments?comment_POST_ID=' + id).then((response) => {
		if (response.statusText === 'OK') {
			// commit('COMMENTS', response.data);
			return response.data;
		}
	}).catch((error) => {
		console.log(error);
	})
}
