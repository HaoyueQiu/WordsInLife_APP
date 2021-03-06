import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import WordsSubject from '@/components/WordsSubject'
import Word from '@/components/Word'
import Game from '@/components/Game'
import EditGame from '@/components/EditGame'
import GamePlay from '@/components/GamePlay'
import Statistics from '@/components/Statistics'
import Setting from '@/components/Setting'
Vue.use(Router)

//暴露路由接口
const router =  new Router({
  routes: [
    {
      //不要home界面
      path: '/',
      name: 'Home',
      // component 代表加载到相应路由上后所使用的组件
      component: Login,
      meta:{
        //requireAuth:true,
        //navbarActive:true,
      }
    },
    {
      path:'/login',
      name:'Login',
      component:Login,
      meta:{
        //。。。。。。。。。。。。。。。false！！！！！！
        navbarActive: true,
      }
    },
    {
      path:'/register',
      name:'Register',
      component:Register,
      meta:{
        //。。。。。。。。。。。。。。。false！！！！！！
        navbarActive: true,
      }
    },
        {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        navbarActive: true,
      }
    },
    {
      path:'/wordsSubject',
      name:'WordsSubject',
      component:WordsSubject,
      meta:{
        navbarActive: true,
      }
    },
    {
      path:'/wordsSubject/:subject',
      name:'words',
      component:Word,
      meta:{
        navbarActive: true,
      }
    },
    {
      path:'/game',
      name:'game',
      component:Game,
      meta:{
        navbarActive: true,
      }
    },
    {
      path:'/game/:game_pic',
      name:'gamePlay',
      component:GamePlay,
      meta:{
        navbarActive: false,
      }
    },
    {
      path:'/editGame',
      name:'EditGame',
      component:EditGame,
      meta:{
        navbarActive: true,
      }
    },
    {
      path:'/statistics',
      name:'statistics',
      component:Statistics,
      meta:{
        navbarActive: true,
      }
    },
    {
      path:'/setting',
      name:'setting',
      component:Setting,
      meta:{
        navbarActive: true,
      }
    },
  ]
});


//https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
//导航守卫，以下主要用于判断是否为已登录状态，未登录则请求登录
// router.beforeEach((to,from,next)=>{
//   const token = window.localStorage.getItem('token')
//   // if(to.matched.some(record => record.meta.requiresAuth) &&(!token|| token === null)){
//   //   next({//未登录的用户重定向到登录界面。
//   //   path: '/login',
//   //   query: {redirect: to.fullPath}
//   //   })
//   // }else if(token && to.name == 'Login') {
//   //   //对于已经登录的用户，如果他还要去登录路界面那么就进行拦截
//   //   next({
//   //   path: from.fullPath
//   //   })
//   // }else {
//   //   next()
//   // }
// });


export default router
