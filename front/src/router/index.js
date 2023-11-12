import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CreateAuction from '../views/CreateAuction.vue'
import ViewAuctions from '../views/ViewAuctions.vue'
import ViewHome from '../views/homePage.vue'
import ViewRegister from '../views/registerPage.vue'


const routes = [
  {
    path: '/new_auction',
    name: 'home',
    component: CreateAuction
  },
  {
    path: '/auctions',
    name: 'about',
    component: ViewAuctions
  },
  {
    path: '/home',
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
