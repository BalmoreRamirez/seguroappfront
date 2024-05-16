import {createRouter, createWebHistory} from 'vue-router'
import Consultar from '../views/Consultar.vue'
import Ingresar from '../views/Ingresar.vue'
import Inicio from '../views/Inicio.vue'
import VisualizarClub from "../views/VisualizarClub.vue";
import Login from "../views/Login.vue";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/inicio',
        name: 'Inicio',
        component: Inicio,
        meta: {requiresAuth: true, showMenu: true}
    },
    {
        path: '/consultar',
        name: 'Consultar',
        component: Consultar,
        meta: {requiresAuth: true, showMenu: true}
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        component: Ingresar,
        meta: {requiresAuth: true, showMenu: true}
    },
    {
        path: '/visualizarClub/:id',
        name: 'VisualizarClub',
        component: VisualizarClub,
        meta: {requiresAuth: true}
    }
]

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('token')) {
            next({name: 'Login'});
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router