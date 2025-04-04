

import Dashboard from '@/components/Dashboard.vue';
import CreateCustomer from '@/pages/customers/CreateCustomer.vue';
import ManageCustomer from '@/pages/customers/ManageCustomer.vue';
import ShowCustomer from '@/pages/customers/ShowCustomer.vue';
import UpdateCustomer from '@/pages/customers/UpdateCustomer.vue';
import NotFound from '@/pages/NotFound.vue';
import CreateSelf from '@/pages/self/CreateSelf.vue';
import ManageSelf from '@/pages/self/ManageSelf.vue';
import UpdateSelf from '@/pages/self/UpdateSelf.vue';
import CreateSuppliers from '@/pages/suppliers/CreateSuppliers.vue';
import ManageSuppliers from '@/pages/suppliers/ManageSuppliers.vue';
import ShowSuppliers from '@/pages/suppliers/ShowSuppliers.vue';
import UpdateSuppliers from '@/pages/suppliers/UpdateSuppliers.vue';
import ManageUsers from '@/pages/users/ManageUsers.vue';
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  { path: '/', component: Dashboard },

  // customer
  { path: '/customers', component: ManageCustomer },
  { path: '/create_customers', component: CreateCustomer },
  { path:'/customers/edit/:id', component: UpdateCustomer},
  { path:'/customers/:id', component: ShowCustomer},


  { path: '/users', component: ManageUsers },

// supplier
  { path: '/suppliers', component: ManageSuppliers },
  { path: '/create_suppliers', component: CreateSuppliers },
  { path:'/suppliers/edit/:id', component: UpdateSuppliers},
  { path:'/suppliers/:id', component: ShowSuppliers},


  // self
  { path: '/self', component: ManageSelf },
  {path:'/create_self', component: CreateSelf},
  { path:'/self/edit/:id', component: UpdateSelf},


  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;