import Dashboard from "./Pages/Dashboard.vue";
import Customers from "./Pages/Customers.vue";
import EditProfile from "./Pages/EditProfile.vue";
import Insurance from "./Pages/Insurance.vue";
import Activations from "./Pages/Activations.vue";
import Login from "./Pages/Login.vue"
import ForgotPassword from "./Pages/ForgotPassword.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "Dashboard",
        component: Dashboard,
        path: "/dashboard",
    },
    {
        name: "Customers",
        component: Customers,
        path: "/customers",
    },
    {
        name: "EditProfile",
        component: EditProfile,
        path: "/edit-profile",
    },
    {
        name: "Insurance",
        component: Insurance,
        path: "/insurance",
    },
    {
        name: "Activations",
        component: Activations,
        path: "/activations",
    },
    {
        name: "Login",
        component: Login,
        path: "/",
    },
    {
        name: "ForgotPassword",
        component: ForgotPassword,
        path: "/forgot-password",
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
