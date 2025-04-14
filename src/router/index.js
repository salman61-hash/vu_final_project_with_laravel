

import Dashboard from '@/components/Dashboard.vue';
import Mainlayout from '@/layout/Mainlayout.vue';
import CreateCoupuns from '@/pages/coupons/CreateCoupuns.vue';
import ManageCoupons from '@/pages/coupons/ManageCoupons.vue';
import UpdateCoupons from '@/pages/coupons/UpdateCoupons.vue';
import CreateCustomer from '@/pages/customers/CreateCustomer.vue';
import ManageCustomer from '@/pages/customers/ManageCustomer.vue';
import ShowCustomer from '@/pages/customers/ShowCustomer.vue';
import UpdateCustomer from '@/pages/customers/UpdateCustomer.vue';
import Signin from '@/pages/loginRegister/Signin.vue';

import NotFound from '@/pages/NotFound.vue';
import CreateStatus from '@/pages/payment_status/CreateStatus.vue';
import ManageStatus from '@/pages/payment_status/ManageStatus.vue';
import UpdateStatus from '@/pages/payment_status/UpdateStatus.vue';
import CreateProduct from '@/pages/products/CreateProduct.vue';
import ManageProduct from '@/pages/products/ManageProduct.vue';
import ShowProduct from '@/pages/products/ShowProduct.vue';
import UpdateProduct from '@/pages/products/UpdateProduct.vue';
import ManagePdetails from '@/pages/purchase_details/ManagePdetails.vue';
import CreatePreturn from '@/pages/purchase_return/CreatePreturn.vue';
import ManagePreturn from '@/pages/purchase_return/ManagePreturn.vue';
import ManageReturnDet from '@/pages/purchaseReturnDetails/ManageReturnDet.vue';
import CreatePurchase from '@/pages/purchases/CreatePurchase.vue';
import ManagePurchase from '@/pages/purchases/ManagePurchase.vue';
import UpdatePurchase from '@/pages/purchases/UpdatePurchase.vue';
import CreateSales from '@/pages/sales/CreateSales.vue';
import ManageSales from '@/pages/sales/ManageSales.vue';
import ManageSales_details from '@/pages/sales_details/ManageSales_details.vue';
import CreateSelf from '@/pages/self/CreateSelf.vue';
import ManageSelf from '@/pages/self/ManageSelf.vue';
import UpdateSelf from '@/pages/self/UpdateSelf.vue';
import CreateSuppliers from '@/pages/suppliers/CreateSuppliers.vue';
import ManageSuppliers from '@/pages/suppliers/ManageSuppliers.vue';
import ShowSuppliers from '@/pages/suppliers/ShowSuppliers.vue';
import UpdateSuppliers from '@/pages/suppliers/UpdateSuppliers.vue';
import ManageUsers from '@/pages/users/ManageUsers.vue';
import { useAuthStore } from '@/store/AuthStore';
import { createRouter, createWebHistory, useRouter } from 'vue-router'




const routes = [


  {path: '/login', name: 'Login', component: Signin, meta: { public: true },},
  {
    path: '/',
    component:Mainlayout,
    children: [

      { path: 'dashboard', component: Dashboard },

      // customer
      { path: 'customers', component: ManageCustomer },
      { path: 'create_customers', component: CreateCustomer },
      { path:'customers/edit/:id', component: UpdateCustomer},
      { path:'customers/:id', component: ShowCustomer},
    
    
      { path: 'users', component: ManageUsers },
    
    // supplier
      { path: 'suppliers', component: ManageSuppliers },
      { path: 'create_suppliers', component: CreateSuppliers },
      { path:'suppliers/edit/:id', component: UpdateSuppliers},
      { path:'suppliers/:id', component: ShowSuppliers},
    
    
      // self
      { path: 'self', component: ManageSelf },
      {path:'create_self', component: CreateSelf},
      { path:'self/edit/:id', component: UpdateSelf},
    
      // Coupons
    
      { path: 'coupons', component: ManageCoupons },
      {path:'create_coupons', component: CreateCoupuns},
      { path:'coupons/edit/:id', component: UpdateCoupons},
    
      // payment_status
      { path: 'status', component: ManageStatus },
      { path:'create_status', component: CreateStatus},
      { path:'status/edit/:id', component: UpdateStatus},
    
      // products
      { path: 'products', component: ManageProduct },
      { path:'create_products', component: CreateProduct},
      { path: 'products/edit/:id', component: UpdateProduct},
      { path: 'products/:id', component: ShowProduct},
    
    // purchase
    { path: 'purchase', component: ManagePurchase },
    { path:'create_purchase', component: CreatePurchase},
    { path: 'purchase/edit/:id', component: UpdatePurchase},
    
    
    // sales
    { path: 'sales', component: ManageSales },
    { path:'create_sales', component: CreateSales},
    
    // Purchase_details
    
    { path: 'purchase_details', component: ManagePdetails },


    // purchase return
    { path: 'purchase_return', component: ManagePreturn },
    { path: 'create_purchase_return', component: CreatePreturn },
    

    // Purchase return details
    { path: 'purchaseDetails_return', component: ManageReturnDet },

    
    // sales_details
    { path: 'sales_details', component: ManageSales_details },
    // { path: 'sales_details', component: ManageSales },
    


    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
  
  
  
  

]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (!to.meta.public && !auth.token) {
    return next('/login');
  }
  next();
});


export default router;