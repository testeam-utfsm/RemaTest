import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CreateAuction from '../views/auctions/createAuction.vue'
import ViewAuctions from '../views/auctions/indexAuction.vue'
import ViewHome from '../views/homePage.vue'
import ViewRegister from '../views/registerPage.vue'


const routes = [
  {
    path: '/auctions/create',
    name: 'home',
    component: CreateAuction
  },
  {
    path: '/',
    name: 'about',
    component: ViewAuctions
  },
  {
    path: '/login',
    name: 'homePage',
    component: ViewHome
  },
  {
    path: '/register',
    name: 'registerPage',
    component: ViewRegister
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
