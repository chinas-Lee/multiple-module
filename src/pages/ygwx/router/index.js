import Vue from 'vue'
import Router from 'vue-router'
import Routes from './route'
import BeforeEach from './before-each'

Vue.use(Router)

const router = new Router({
  routes: Routes
})

router.beforeEach(BeforeEach)

export default router
