<template>
    <div class="container mt-4">
     <div class="card shadow-lg">
         <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
             <h4 class="mb-0">Update Self</h4>
             <RouterLink to="/self" class="btn btn-light">
                 <i class="fas fa-arrow-left"></i> Back
             </RouterLink>
         </div>
 
         <div class="card-body">
             <form @submit.prevent="updateself">
                 <div class="mb-3">
                     <label class="form-label">Name</label>
                     <input type="text" v-model="selfs.name" class="form-control" placeholder="Enter customer name" required>
                 </div>
 
                 <div class="d-flex justify-content-end">
                     <button type="submit" class="btn btn-success">
                         <i class="fas fa-save"></i> Update self
                     </button>
                 </div>
             </form>
         </div>
     </div>
 </div>
 </template>
 
 <script lang="ts" setup>
 import api from '@/Api';
 import router from '@/router';
 import { onMounted, reactive } from 'vue';
 import { useRoute } from 'vue-router';
 
 const { id } = useRoute().params;
 
 onMounted(() => {
     fetchself();
 });
 
 const fetchself = () => {
     api.get(`/self/${id}`)
     .then((res) => {
         console.log(res.data);
         selfs.id = res.data.self.id;  // no change, using "selfs"
         selfs.name = res.data.self.name;
     })
     .catch(err => {
         console.log(err);
     });
 };
 
 const selfs = reactive({
     id: "",      // added 'id' here to prevent undefined error
     name: ""
 });
 
 const updateself = () => {
     api.put("/self" + selfs.id, selfs)
     .then(res => {
         console.log(res);
         router.push({ path: '/self' }); // changed from '/customers' to '/self'
     })
     .catch(err => {
         console.log(err);
     });
 };
 </script>
 
 <style>
 /* Your style goes here */
 </style>
 