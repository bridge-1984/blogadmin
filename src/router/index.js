import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'homeIndex',
        component: () => import('../views/home/HomeIndex.vue')
      },
      {
        path: 'article/list',
        name: 'articleList',
        component: () => import('../views/article/ArticleList.vue')
      },
      {
        path: 'article/add',
        name: 'articleAdd',
        component: () => import('../views/article/ArticleAdd.vue')
      },
      {
        path: 'article/edit',
        name: 'articleEdit',
        component: () => import('../views/article/ArticleEdit.vue')
      },
      {
        path: 'tag/list',
        name: 'tagList',
        component: () => import('../views/tag/TagList.vue')
      },
      {
        path: 'tag/add',
        name: 'tagAdd',
        component: () => import('../views/tag/TagAdd.vue')
      },
      {
        path: 'tag/edit',
        name: 'tagEdit',
        component: () => import('../views/tag/TagEdit.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/UserLogin.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
