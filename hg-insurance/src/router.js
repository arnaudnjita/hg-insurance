import Dashboard from "./Pages/Dashboard.vue";
import Customers from "./Pages/Customers.vue";
import EditProfile from "./Pages/EditProfile.vue";
import Insurance from "./Pages/Insurance.vue";
import Activations from "./Pages/Activations.vue";
import Login from "./Pages/Login.vue"
import ForgotPassword from "./Pages/ForgotPassword.vue"

import MyDashboard from "./Pages_cus/MyDashboard.vue";
import MyActivations from "./Pages_cus/MyActivations.vue";
import MyEditProfile from './Pages_cus/MyEditProfile.vue';
import NotFound from './Pages/NotFound.vue';
import NetworkError from './Pages/NetworkError.vue'

import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "MyDashboard",
        component: MyDashboard,
        path: "/my-dashboard",
        meta: {
            requiresAuth: true,
            isStaff: false,
        },
        beforeEnter: () => {
            if(localStorage.getItem('staff')=='true' && localStorage.getItem('token')){
                return '/dashboard'
            }
            else if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        }
    },
    {
        name: "MyEditProfile",
        component: MyEditProfile,
        path: "/my-edit-profile",
        meta: {
            requiresAuth: true,
            isStaff: false,
        },
        beforeEnter: () => {
            if(localStorage.getItem('staff')=='true' && localStorage.getItem('token')){
                return '/dashboard'
            }
            else if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        }
    },
    {
        name: "Login",
        component: Login,
        path: "/",
        meta: {
            requiresAuth: false,
        },
        beforeEnter: () => {
            if(localStorage.getItem('token')==null){
                return true
            }
            else if(localStorage.getItem('token') && localStorage.getItem('staff')=='false'){
                return '/my-dashboard'
            }
            else {
                return '/dashboard'
            }
            }
    },
    {
        name: "Dashboard",
        component: Dashboard,
        path: "/dashboard",
        meta: {
            requiresAuth: true,
            isStaff: true,
        },
        beforeEnter: () => {
            if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return '/my-dashboard'
            }
            else if(localStorage.getItem('staff') == 'true' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
            }
    },
    {
        name: "MyActivations",
        component: MyActivations,
        path: "/my-activations",
        meta: {
            requiresAuth: true,
            isStaff: false,
        },
        beforeEnter: () => {
            if(localStorage.getItem('staff')=='true' && localStorage.getItem('token')){
                return '/dashboard'
            }
            else if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
            }
    },
    {
        name: "Customers",
        component: Customers,
        path: "/customers",
        beforeEnter: () => {
            if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return '/my-dashboard'
            }
            else if(localStorage.getItem('staff') == 'true' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        }
    },
    {
        name: "EditProfile",
        component: EditProfile,
        path: "/edit-profile",
        beforeEnter: () => {
            if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return '/my-dashboard'
            }
            else if(localStorage.getItem('staff') == 'true' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        }
    },
    {
        name: "Insurance",
        component: Insurance,
        path: "/insurance",
        beforeEnter: () => {
            if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return '/my-dashboard'
            }
            else if(localStorage.getItem('staff') == 'true' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        } 
    },
    {
        name: "Activations",
        component: Activations,
        path: "/activations",
        beforeEnter: () => {
            if(localStorage.getItem('staff') == 'false' && localStorage.getItem('token') ){
                return '/my-dashboard'
            }
            else if(localStorage.getItem('staff') == 'true' && localStorage.getItem('token') ){
                return true
            }
            else
                return '/'
        }
    },
    {
        name: "ForgotPassword",
        component: ForgotPassword,
        path: "/forgot-password",
    },
    {
        name: "404Resource",
        component: NotFound,
        path: '/404/:resource',
        props:true
    },
    {
        name: "NetworkError",
        component: NetworkError,
        path: '/network-error'
    },
    {
        name: "NotFound",
        component: NotFound,
        path: '/:catchAll(.*)'
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (localStorage.getItem('token') == null) {
//         next('/')
//       } 
//       else {
//         if (to.matched.some(record => record.meta.isStaff)) {
//           if (localStorage.getItem(staff) == true) {
//             next(false)
//           } else {
//             next({ name: 'userboard' })
//           }
//         } else {
//           next()
//         }
//       }
//     } else if (to.matched.some(record => record.meta.guest)) {
//       if (localStorage.getItem('jwt') == null) {
//         next()
//       } else {
//         next({ name: 'userboard' })
//       }
//     } else {
//       next()
//     }
//   })

// router.beforeEach((to, from, next) => {
//     console.log(from.meta.requiresAuth)
//     console.log(to.meta.requiresAuth)
//     if (to.meta.requiresAuth && localStorage.getItem('token') == null){
//             next('/')
            
//         }
//     else if(!to.meta.requiresAuth && localStorage.getItem('token')) {
//                 next('/dashboard')
//             }
    // else if(!to.meta.requiresAuth && localStorage.getItem('token') && to.name == 'MyActivations') {
    //     next('/dashboard')
    // }
    // else if(!to.meta.requiresAuth && localStorage.getItem('token') && to.name == 'Login') {
    //     next('/dashboard')
    // }
    // else if(to.meta.requiresAuth && to.meta.isCus && localStorage.getItem('token')){
    //     next('/dashboard')
    // }
    // else if(to.meta.requiresAuth && to.meta.isStaff && localStorage.getItem('token')){
    //     next('/my-dashboard')
    // }
//     else {
//             next() // make sure to always call next()!
//         }
// })

  



export default router;
