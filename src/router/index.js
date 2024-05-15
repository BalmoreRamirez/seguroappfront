import { createRouter, createWebHistory } from 'vue-router'
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
    },
    {
        path: '/consultar',
        name: 'Consultar',
        component: Consultar,
        meta: { showMenu: true }
    },
    {
        path: '/ingresar',
        name: 'Ingresar',
        component: Ingresar,
        meta: { showMenu: true }
    },
    {
        path: '/visualizarClub/:id',
        name: 'VisualizarClub',
        component: VisualizarClub
    }
]

const router = new createRouter({
    history: createWebHistory(),
    routes
})

export default router