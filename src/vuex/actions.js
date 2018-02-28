import request from 'axios'

var Mdjs = require('md-js');
var baseURL = 'http://api.woshuone.com';

// request.defaults.baseURL = 'http://api.woshuone.com'

var pageIndex = 0;

export const getTopics = ({ commit, state }) => {
	if (state.topics.length) { //如果已经加载过了就不另外加载了(处理每次进入文章列表自动加载更多)
		return;
	}
	return getMoreTopics({ commit, state });
}

//加载更多的文章列表
export const getMoreTopics = ({ commit, state }) => {
	if (!state.hasmore) {
		return;
	}
	return request.get(baseURL + '/posts?post_status=publish&pageIndex=' + (state.pageIndex++)).then((response) => {
		if (response.statusText === 'OK') {
			var res = response.data;
			for (var i=0,l=res.length;i<l;i++) {
				res[i]['post_content'] = Mdjs.md2html(res[i]['post_content']);
			}
			commit('TOPICS_LIST', res);
		}
	}).catch((error) => {
		console.log(error)
	})
}

// 加载该文章的数据(该文章内容、该文章评论、该文章分类)
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

export const getAllTags = ({ commit, state }) => {
	if (state.tags && state.tags.length) {
		return state.tags;
	}
	return request.get(`${baseURL}/terms`).then((response) => {
		if (response.statusText === 'OK') {
			commit('All_TAGS', response.data);
		}
	}).catch((error) => {
		console.log(error);
	})
}

const getArticle = ({ commit, state }, { id }) => {
	state.article = {};
	return request.get(`${baseURL}/posts?ID=${id}`).then((response) => {
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
	if (terms) { // 如果已经加载过该文章的分类，不再请求数据了
		return terms;
	}
	return request.get(`${baseURL}/terms/post/${id}`).then((response) => {
		if (response.statusText === 'OK') {
			return response.data;
		}
	}).catch((error) => {
		console.log(error);
	})
}

const getComments = ({ commit, state }, { id }) => {
	state.comments = [];
	return request.get(`${baseURL}/comments?comment_POST_ID=${id}`).then((response) => {
		if (response.statusText === 'OK') {
			// commit('COMMENTS', response.data);
			return response.data;
		}
	}).catch((error) => {
		console.log(error);
	})
}
