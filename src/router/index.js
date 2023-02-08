import store from '@/store';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace
// push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
// // replace
// VueRouter.prototype.replace = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => err)
// }

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(() => {})
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path:'/home',
    redirect:'/'
  },
  {
    path: '/follow',
    name: 'follow',
    component: () => import('../views/Follow.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('../views/Recommend.vue')
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('../views/Friend.vue')
  },
  
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path:'/video/:id',
    name:'video',
    component:() => import('../views/Video.vue')
  },
  
  {
    path:'/video',redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
    if(to.name=='user'){
        let  token=window.sessionStorage.getItem('user')
        // console.log(token);
        if(token){
            // next({name:'user',params:{id:JSON.parse(token).id}})
            next()
        }else{
            store.dispatch('toast/showToast',{title:'请先登录'})

            store.commit('loginStatus/changeIsShowLoginMenu',{isShowLoginMenu:true})
        }
        return
    }else{
        next()
    }
})
export default router
