import {createWebHistory, createRouter} from "vue-router";
import TheHome from '@/page/TheHome'
import TheAssets from '@/page/TheAssets'
import TheLogin from '@/page/login/TheLogin'

const routes = [
    {path:'/',redirect: '/home'},
    {path:'/login',component:TheLogin},
    {path:'/home',component:TheHome},
    {path:'/assets', component: TheAssets},
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
  })  
  
export {router};