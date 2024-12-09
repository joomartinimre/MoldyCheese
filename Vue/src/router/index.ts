import AboutUsView from '@/views/AboutUsView.vue'
import ApplyView from '@/views/ApplyView.vue'
import HomePage from '@/views/HomePage.vue'
import PlayGroundView from '@/views/PlayGroundView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import SchoolView from '@/views/SchoolView.vue'
import ShopView from '@/views/ShopView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/apply',
      name: 'apply',
      component: ApplyView,
    },
    {
      path: '/playground',
      name: 'playground',
      component: PlayGroundView,
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: RestaurantView,
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUsView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/school',
      name: 'school',
      component: SchoolView,
    }
    
   
  ],
})

export default router
