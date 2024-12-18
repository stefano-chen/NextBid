import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AuctionsView from '@/views/AuctionsView.vue'
import SignInView from '@/views/SignInView.vue'
import UserProfileView from '@/views/UserProfileView.vue'
import CreateAuctionView from '@/views/CreateAuctionView.vue'
import UsersView from '@/views/UsersView.vue'
import AuctionDetailView from '@/views/AuctionDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/auctions',
      name: 'Auctions',
      component: AuctionsView,
    },
    {
      path: '/users',
      name: 'Users',
      component: UsersView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView,
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/user/:id',
      name: 'UserByID',
      component: UserProfileView,
    },
    {
      path: '/auction/create',
      name: 'CreateAuction',
      component: CreateAuctionView,
    },
    {
      path: '/auction/:id',
      name: 'AuctionByID',
      component: AuctionDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
