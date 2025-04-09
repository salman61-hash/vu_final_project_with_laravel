<template>
 <div class="container mt-4">
           <div class="card shadow-lg">
               <!-- Header with Add Button -->
               <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                   <h4 class="mb-0">Status List</h4>
               <RouterLink to="/create_status" class="btn btn-light">
                   <i class="fas fa-plus-circle"></i> Add Status
               </RouterLink>
               </div>
   
               <!-- Search Bar -->
               <div class="mb-3 mt-3">
                   <form class="d-flex justify-content-center">
                       <div class="input-group" style="max-width: 400px">
                           <input v-model="search" @input="fetchstatus" class="form-control rounded"
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
                           <thead class="table-dark">
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                           </thead>
                           <tbody>
                               <tr v-for="status in status.data" :key="status.id">
                                   <td>{{ status.id }}</td>
                                   <td>{{ status.name }}</td>                               
                                   
                                   
                                   <td>
                                   <RouterLink class="btn btn-sm btn-info me-2" :to="`/status/${status.id}`">
                                       Show <i class="fas fa-eye"></i>
                                   </RouterLink>
                                   <RouterLink class="btn btn-sm btn-warning me-2" :to="`/status/edit/${status.id}`">
                                       Update <i class="fas fa-edit"></i>
                                   </RouterLink>
                                   <button class="btn btn-danger btn-sm" @click="deletestatus(status.id)">
                                       Delete
                                   </button>
                               </td>
                               </tr>
                               <tr v-if="status.data && status.data.length === 0">
                                   <td colspan="6" class="text-center text-danger">
                                       No statuss Found
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
                                       @click.prevent="page.url && fetchstatus(page.url)">
                                   </a>
                               </li>
                           </ul>
                       </nav>
                   </div>
               </div>
           </div>
       </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';

const status = ref({ data: [] });
   const search = ref("");
   const pagination = ref({});


   onMounted(() => {
       fetchstatus();
     
   });

   const fetchstatus = (url = "/status") => {
    if (typeof url !== "string") {
        url = "/status";
    }
    api
        .get(url, { params: { search: search.value } })
        .then((result) => {
            
            console.log(result.data.data); 
            status.value = result.data; 
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



   const deletestatus = (id)=>{
       api.delete(`/status/${id}`)
               .then((res)=>{
                   console.log(res);
                   fetchstatus();
                   
               }).catch(err => {
         console.log(err);
       });
   }

   

</script>

<style>

</style>