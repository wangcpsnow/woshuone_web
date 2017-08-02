import Vue from 'vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Topics from '../components/Topics.vue'
import Article from '../components/Article.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{ path: '/', component: Home },
		{ path: '/topics', component: Topics },
		{ path: '/article/:id(\\d+)', name: 'article', component: Article },
		{ path: '/about', component: About }
	],
	scrollBehavior (to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
	}
})

export default router
