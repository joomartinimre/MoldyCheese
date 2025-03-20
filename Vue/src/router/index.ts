import LandingLayout from '@/layouts/LandingLayout.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import HomePage from '@/views/HomePage.vue'
import LoginView from '@/views/LoginView.vue'
import PlaceView from '@/views/PlaceView.vue'
import PlayGroundView from '@/views/PlayGroundView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import RestaurantView from '@/views/RestaurantView.vue'
import SchoolView from '@/views/SchoolView.vue'
import ShopView from '@/views/ShopView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: LandingLayout,
      children: [
      {
        path: '/',
        name: 'home',
        component: HomePage,
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/registration',
        name: 'registration',
        component: RegistrationView,
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
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
      },
      {
        path: '/place/:id',
        name: 'place',
        component: PlaceView,
      }]
    },
    
   
  ],
})

export default router
