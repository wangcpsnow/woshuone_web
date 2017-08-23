import Vue from 'vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Explore from '../components/Explore.vue'
import Topics from '../components/Topics.vue'
import Article from '../components/Article.vue'
import Admin from '../components/Admin.vue'
import AddArticle from '../components/AddArticle.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{ path: '/', component: Home },
		{ path: '/explore', component: Explore },
		{ path: '/topics', component: Topics },
		{ path: '/article/:id(\\d+)', name: 'article', component: Article },
		{ path: '/about', component: About },
		{ path: '/admin', component: Admin },
		{ path: '/publish', component: AddArticle }
	],
	scrollBehavior (to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
	}
})

export default router
