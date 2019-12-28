import firebase from 'firebase';
import Router from 'vue-router';
import Vue from 'vue';
import { store } from './store';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/project.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/RegisterView',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/dashboard.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/project',
      name: 'Project',
      component: () => import('./views/project.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/createProjectView',
      name: 'Create Project',
      component: () => import('./views/createProjectView.vue'),
      props: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/sendProjectChapterView',
      name: 'Send Project Chapter',
      component: () => import('./views/sendProjectChapterView.vue'),
      props: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/chatView',
      name: 'Chat',
      component: () => import('./views/chatView.vue'),
      props: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/chatListView',
      name: 'Conversations List',
      component: () => import('./views/chatListView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/loginView',
      name: 'Login',
      component: () => import('./views/loginView.vue'),
      prop: true,
    },
    {
      path: '/accountView',
      name: 'Account',
      component: () => import('./views/accountView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/ProjectPartnerView',
      name: 'Project Partner',
      component: () => import('./views/ProjectPartnerView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/addProjectPartnerView',
      name: 'Add Project Partner',
      component: () => import('./views/addProjectPartnerView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/approveProposalView',
      name: 'Approve Proposal',
      component: () => import('./views/approveProposalView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/reviewProjectChapterView',
      name: 'Review Project Chapter',
      component: () => import('./views/reviewProjectChapterView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/ProjectChapterReaderView',
      name: 'Project Chapter Reader',
      component: () => import('./views/ProjectChapterReaderView.vue'),
      prop: true,
      meta: {
        requiresAuth: false,
      },
    },
  ],

});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  const currentUserLoggedIn = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !currentUserLoggedIn) {
    next('loginView');
  } else if (requiresAuth && currentUserLoggedIn) {
    next();
  } else {
    next();
  }
};
router.beforeEach(waitForStorageToBeReady);

export default router;
