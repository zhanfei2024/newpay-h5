import Vue from 'vue'
import Router from 'vue-router'
import { routesConfig } from './routes'

Vue.use(Router)

export const router = new Router({
    routes: routesConfig
})