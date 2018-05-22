import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import searchMedical from '@/components/searchMedical'
import searchMedical_result from '@/components/searchMedical_result'
//import collectMedical from '@/components/collectMedical'
import borrowMedical from '@/components/borrowMedical'
import borrowMedical_result from '@/components/borrowMedical_result'
import borrowRecord from '@/components/borrowRecord'
import manageMedical from '@/components/manageMedical'
import manageMedical_result from '@/components/manageMedical_result'
import queryMedical from '@/components/queryMedical'
import queryMedical_result from '@/components/queryMedical_result'
import queryMedical_detail from '@/components/queryMedical_detail'
import queryMedical_record from '@/components/queryMedical_record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/searchMedical',
      name: 'searchMedical',
      component: searchMedical
    },
    {
      path: '/searchMedical_result',
      name: 'searchMedical_result',
      component:searchMedical_result
    },
    {
      path: '/borrowMedical',
      name: 'borrowMedical',
      component: borrowMedical
    },
    {
      path: '/borrowMedical_result',
      name: 'borrowMedical_result',
      component:borrowMedical_result
    },
    {
      path: '/borrowRecord',
      name: 'borrowRecord',
      component:borrowRecord
    },
    {
      path: '/manageMedical',
      name: 'manageMedical',
      component: manageMedical
    },
    {
      path: '/manageMedical_result',
      name: 'manageMedical_result',
      component: manageMedical_result
    },
    {
      path: '/queryMedical',
      name: 'queryMedical',
      component: queryMedical
    },
    {
      path: '/queryMedical_result',
      name: 'queryMedical_result',
      component: queryMedical_result
    },
    {
      path: '/queryMedical_detail',
      name: 'queryMedical_detail',
      component: queryMedical_detail
    },
    {
      path: '/queryMedical_record',
      name: 'queryMedical_record',
      component: queryMedical_record
    }
  ]
})

