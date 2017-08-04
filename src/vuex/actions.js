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
		getComments({ commit, state }, { id })
	]).then(values => {
		commit('ARTICLE', values[0]);
		commit('COMMENTS', values[1]);
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


function getCustomMdjsRenderer() {
	var renderer = new Mdjs.MdjsRenderer();
	
	renderer.func.table = (headContent, bodyContent) =>
		`<table class="table table-bordered"><thead>${headContent}</thead><tbody>${bodyContent}</tbody></table>`;
	
	renderer.tag.quote = [
		'<blockquote class="bg-faded"> ',
		'</blockquote>'
	];

	renderer.tag.toc = [
		`<div class="card mb-3 mt-2" id="md_toc">
			<div class="card-block">
				<h4 class="card-title mb-0" 
					style="cursor: pointer;line-height:1.1"
					data-toggle="collapse" href="#md_toc_content" >
					Table Of Contents</h4>
				<div class="collapse mt-3 __show_if_export__" id="md_toc_content">
				`,
		`		</div>
			</div>
		</div>`
	];
	renderer.tag.tocList = ['<ul style="padding-left:1em;padding-bottom:.5em;list-style:none">', '</ul>'],
	renderer.tag.tocItem = ['<a href="#$uri"><li style="padding-bottom: .35em">', '</li></a>'];
	
	renderer.tag.codeBlock = [
		'<div class="card my-2 bg-faded"><div class="card-block"><h6 class="card-subtitle text-muted">$language</h6>' +
		'<pre class="mt-3"><code>',
		'</code></pre></div></div>'
	];
	renderer.tag.footNote = [
		`<div class="md-foot"><br/><hr/><br/><ol>`,
		`</ol></div>`];

	renderer.func.heading = (level, name, content) =>
		`<h${level} id="${name}" name="${name}">${content}</h${level}>${level==1?'<hr style="margin-bottom: 1.2rem"/>':''}`;
	
	renderer.func.image = (uri, title, altText) =>
		`<img alt="${Mdjs.escapedHTML(altText)}" 
				title="${Mdjs.escapedHTML(title)}" 
				src="${encodeURI(uri)}" />
		<span class="md-img-text text-center">${altText}</span><br/>`;
	
	renderer.func.link = (uri, title, content) =>
		`<a target="_blank" title="${Mdjs.escapedHTML(title)}" href="${encodeURI(uri)}">${content}</a>`;
	
	return renderer;
}