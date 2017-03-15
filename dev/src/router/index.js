import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from '@/components/Login';
import Playlist from '@/components/Playlist';
import PlaylistDetail from '@/components/Playlist-Detail';
import Faq from '@/components/Faq';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/playlist',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title() {
          return 'Login | dopelst';
        },
      },
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist,
      meta: {
        title() {
          return 'Playlist | dopelst';
        },
      },
    },
    {
      path: '/playlist/:id',
      name: 'Playlist-Detail',
      component: PlaylistDetail,
      meta: {
        title(params) {
          return `${params.name} | dopelst`;
        },
      },
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: Faq,
      meta: {
        title() {
          console.log("hello");
          return 'FAQ | dopelst';

        },
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !firebase.auth().currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
