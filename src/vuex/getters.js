export const getTopics = state => state.topics
export const getHasMore = state => state.hasmore
export const getArticle = state => state.article
export const getComments = state => state.comments
export const getArticleTerms = function (state) {
	return state.articleTerms[state.article.ID];
}