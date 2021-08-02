import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

/* Layout */
import Layout from '@/layout/index.vue';

Vue.use(Router);

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () =>
      import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: 'dashboard' */ '@/views/dashboard/index.vue'
          ),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: 'guide' */ '@/views/guide/index.vue'),
        name: 'Guide',
        meta: {
          title: 'guide',
          icon: 'guide',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/list',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      {
        path: 'create',
        component: () =>
          import(
            /* webpackChunkName: 'table-create' */ '@/views/table/create.vue'
          ),
        name: 'CreateArticle',
        meta: {
          title: 'createArticle',
          icon: 'edit'
        }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () =>
          import(/* webpackChunkName: 'table-edit' */ '@/views/table/edit.vue'),
        name: 'EditArticle',
        meta: {
          title: 'editArticle',
          noCache: true,
          activeMenu: '/table/list',
          hidden: true
        }
      },
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: 'table-list' */ '@/views/table/index.vue'
          ),
        name: 'ArticleList',
        meta: {
          title: 'articleList',
          icon: 'list'
        }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes: RouteConfig[] = [
  {
    path: '/charts',
    component: Layout,
    redirect: '/charts/index',
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: 'charts' */ '@/views/charts/index.vue'),
        name: 'charts',
        meta: {
          title: 'charts',
          icon: 'chart'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
