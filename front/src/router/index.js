import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import CreateAuction from '../views/CreateAuction.vue'
import ViewAuctions from '../views/ViewAuctions.vue'
import ViewHome from '../views/homePage.vue'


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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
