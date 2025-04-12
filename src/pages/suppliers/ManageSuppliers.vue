<template>
    <div class="container mt-4">
           <div class="card shadow-lg">
               <!-- Header with Add Button -->
               <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                   <h4 class="mb-0">Suppliers List</h4>
               <RouterLink to="/create_suppliers" class="btn btn-light">
                   <i class="fas fa-plus-circle"></i> Add Suppliers
               </RouterLink>
               </div>
   
               <!-- Search Bar -->
               <div class="mb-3 mt-3">
                   <form class="d-flex justify-content-center">
                       <div class="input-group" style="max-width: 400px">
                           <input v-model="search" @input="fetchsuppliers" class="form-control rounded"
                               placeholder="Search..." />
                           <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                               <i class="fas fa-search me-2"></i> Search
                           </button>
                       </div>
                   </form>
               </div>
   
   
             
   
              
   
               <!-- coupon Table -->
               <div class="card-body">
                   <div class="table-responsive">
                       <table class="table table-striped table-hover">
                           <thead class="table-info">
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Contact Person</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                           </thead>
                           <tbody>
                               <tr v-for="supplier in suppliers.data" :key="supplier.id">
                                   <td>{{ supplier.id }}</td>
                                   <td>{{ supplier.name }}</td>                               
                                   <td>{{ supplier.contact_person }}</td>                               
                                   <td>{{ supplier.phone }}</td>
                                   <td>{{ supplier.email }}</td>
                                   <td>{{ supplier.address }}</td>
                                   
                                   <td>
                                   <RouterLink class="btn btn-sm btn-info me-2" :to="`/suppliers/${supplier.id}`">
                                       Show <i class="fas fa-eye"></i>
                                   </RouterLink>
                                   <RouterLink class="btn btn-sm btn-warning me-2" :to="`/suppliers/edit/${supplier.id}`">
                                       Update <i class="fas fa-edit"></i>
                                   </RouterLink>
                                   <button class="btn btn-danger btn-sm" @click="deletesupplier(supplier.id)">
                                       Delete
                                   </button>
                               </td>
                               </tr>
                               <tr v-if="suppliers.data && suppliers.data.length === 0">
                                   <td colspan="6" class="text-center text-danger">
                                       No suppliers Found
                                   </td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
   
                   <!-- Pagination -->
                   <div v-if="pagination.links" class="d-flex justify-content-center mt-3">
                       <nav>
                           <ul class="pagination pagination-sm">
                               <li v-for="(page, index) in pagination.links" :key="index" class="page-item"
                                   :class="{ active: page.active, disabled: !page.url }">
                                   <a href="#" class="page-link" v-html="formatPageLabel(page.label)"
                                       @click.prevent="page.url && fetchsuppliers(page.url)">
                                   </a>
                               </li>
                           </ul>
                       </nav>
                   </div>
               </div>
           </div>
       </div>
   </template>
   
   <script  setup>
   import api from '@/Api';
   import { onMounted, ref } from 'vue';
   
   
   const suppliers = ref({ data: [] });
   const search = ref("");
   const pagination = ref({});
   
   
   onMounted(() => {
       fetchsuppliers();
     
   });
   
   
   const fetchsuppliers = (url = "/suppliers") => {
     if (typeof url !== "string") {
       url = "/suppliers";
     }
     api
       .get(url, { params: { search: search.value } })
       .then((result) => {
         console.log(result.data.data);
         suppliers.value = result.data;
         pagination.value = result.data;
       })
       .catch((err) => {
         console.log(err);
       });
   };
   
   // pagination
   const formatPageLabel = (label) => {
     if (label === "&laquo; Previous") return "«";
     if (label === "Next &raquo;") return "»";
     return label;
   };
   
   const deletesupplier = (id)=>{
       api.delete(`/suppliers/${id}`)
               .then((res)=>{
                   console.log(res);
                   fetchsuppliers();
                   
               }).catch(err => {
         console.log(err);
       });
   }
   
   </script>
   
   <style>
   
   </style>