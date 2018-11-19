import NotFound from './views/404.vue'
import Brower from './views/brower.vue'
import Layout from './views/Layout.vue'
import Layout2 from './views/Layout2.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import UpdatePassword from './views/updatePassword.vue'

import Community from './views/community/Community.vue'
import Forum from './views/community/Forum.vue'
import Post from './views/community/Post.vue'

import PaxUserManage from './views/manage/PaxUserManagement.vue'
import PaxUserNew from './views/manage/PaxUserNew.vue'
import RoleManage from './views/manage/RoleManage.vue'
import ISVManage from './views/manage/ISVManage.vue'
import ISVNew from './views/manage/ISVNew.vue'
import ISVEdit from './views/manage/ISVEdit.vue'
import BoardManage from './views/manage/BoardManage.vue'
import TicketManage from './views/manage/TicketManage.vue'
import TicketEdit from './views/manage/TicketEdit.vue'
import TicketType from './views/manage/TicketType.vue'
import TicketRule from './views/manage/TicketRule.vue'
import TicketRuleNew from './views/manage/TicketRuleNew.vue'
import NdaManage from './views/manage/NdaManage.vue'

import DocManage from './views/manage/DocManage.vue'
import DocEdit from './views/manage/DocEdit.vue'

import Profile from './views/user/Profile.vue'
import Users from './views/user/Users.vue'

import Signup from './views/Signup.vue'
import Nda from './views/Nda.vue'
import Privacy from './views/Privacy.vue'
import Terms from './views/Terms.vue'

import Documentation from './views/download/Documentation.vue'
import Doc from './views/download/Doc.vue'
import Faq from './views/download/Faq.vue'

import Tickets from './views/support/Tickets.vue'
import Ticket from './views/support/Ticket.vue'
import TicketNew from './views/support/TicketNew.vue'

let routes = [
  {
    path: '/404',
    component: NotFound
  },
  // {
  //   path: '/updatePassword',
  //   component: UpdatePassword
  // },
  {
    path: '/updateBrower',
    component: Brower
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Layout,
    name: 'Home',
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/updatePassword',
        component: UpdatePassword
      },
      {
        path: '/signup',
        component: Signup,
        name: 'Sign Up'
      }
    ]
  }, {
    path: '/',
    component: Layout,
    name: 'Home',
    props: {beforeHref: '/'},
    meta: {
      auth: true // 是否需要登录权限;//true需要
    },
    children: [
      {
        path: '/nda',
        component: Nda,
        name: 'ISV Agreement'
      }, {
        path: '/privacy',
        component: Privacy,
        name: 'Privay & Cookies'
      }, {
        path: '/terms',
        component: Terms,
        name: 'Terms & Conditions'
      }, {
        path: '/docs',
        component: Documentation,
        name: 'Documentation'
      }, {
        path: '/docs/:number',
        component: Doc,
        props: {beforeHref: '/docs', name: 'Resources'},
        name: 'Doc'
      }, {
        path: '/tickets',
        component: Tickets,
        name: 'Tickets'
      }, {
        path: '/faq',
        component: Faq,
        name: 'FAQ',
        props: {beforeHref: '/faq'}
      }, {
        path: '/ticket/:code',
        component: Ticket,
        props: {beforeHref: '/tickets', name: 'Tickets'},
        name: 'Ticket'
      }, {
        path: '/tickets/new',
        component: TicketNew,
        name: 'New Ticket',
        props: {beforeHref: '/tickets', name: 'Tickets'},        
      }, {
        path: '/profile',
        component: Profile,
        name: 'Profile'
      }, {
        path: '/users',
        component: Users,
        name: 'Users'
      }, {
        path: '/forum',
        component: Community,
        name: 'Community'
      }, {
        path: '/forum/:number(\\d+)',
        component: Forum,
        name: 'Forum',
        props: {beforeHref: '/forum'}
      }, {
        path: '/forum/:number(\\d+)/:post',
        component: Post,
        props: {beforeHref: '/forum'},
        name: 'Forum'
      }
    ]
  }, {
    path: '/manage',
    component: Layout2,
    name: 'Manage',
    redirect: '/manage/docs',
    meta: {
      auth: true // 是否需要登录权限;//true需要
    },
    children: [
      {
        path: '/manage/isvs',
        component: ISVManage,
        name: 'Manage ISV'
      }, {
        path: '/manage/isvs/new',
        component: ISVNew,
        name: 'New ISV'
      }, {
        path: '/manage/isvs/:number',
        component: ISVEdit,
        name: 'Manage ISV',
        props: {beforeHref: '/manage/isvs', name: 'Manage ISV'}
      }, {
        path: '/manage/users',
        component: PaxUserManage,
        name: 'Manage PAX Users'
      }, {
        path: '/manage/users/new',
        component: PaxUserNew,
        name: 'Manage PAX User',
        props: {beforeHref: '/manage/users', name: 'Manage PAX Users'}
      }, {
        path: '/manage/user/:number',
        component: PaxUserManage,
        name: 'PAX User'
      }, {
        path: '/manage/roles',
        component: RoleManage,
        name: 'Manage Role'
      }, {
        path: '/manage/boards',
        component: BoardManage,
        name: 'Manage Modules'
      }, {
        path: '/manage/rule',
        component: TicketRule,
        name: 'Ticket Rule'
      }, {
        path: '/manage/rule/new',
        component: TicketRuleNew,
        name: 'New Ticket Rule'
      }, {
        path: '/manage/tickettype',
        component: TicketType,
        name: 'Manage Ticket Type'
      }, {
        path: '/manage/tickets',
        component: TicketManage,
        name: 'Manage Tickets'
      }, {
        path: '/manage/tickets/:number',
        component: TicketEdit,
        name: 'Manage Ticket',
        props: {beforeHref: '/manage/tickets', name: 'Manage Tickets'}
      }, {
        path: '/manage/docs',
        component: DocManage,
        name: 'Manage Resources'
      }, {
        path: '/manage/doc/:number',
        component: DocEdit,
        name: 'Manage Resource',
        props: {beforeHref: '/manage/docs', name: 'Manage Resources'}
      }, {
        path: '/manage/nda',
        component: NdaManage,
        name: 'Edit NDA'
      }// { path: '/manage/profile', component: Profile, name: 'Profile' },
    ]
  }, {
    path: '*',
    redirect: {
      path: '/404'
    }
  }
]
export default routes
