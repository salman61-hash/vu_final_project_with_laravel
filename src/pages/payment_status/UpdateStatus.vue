<template>
    <div class="container mt-4">
     <div class="card shadow-lg">
         <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
             <h4 class="mb-0">Update status</h4>
             <RouterLink to="/status" class="btn btn-light">
                 <i class="fas fa-arrow-left"></i> Back
             </RouterLink>
         </div>
 
         <div class="card-body">
             <form @submit.prevent="updatestatus">
                 <div class="mb-3">
                     <label class="form-label">Name</label>
                     <input type="text" v-model="status.name" class="form-control" placeholder="Enter customer name" required>
                 </div>
 
                 <div class="d-flex justify-content-end">
                     <button type="submit" class="btn btn-success">
                         <i class="fas fa-save"></i> Update status
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
     fetchstatus();
 });
 
 const fetchstatus = () => {
     api.get(`/status/${id}`)
     .then((res) => {
         console.log(res.data);
         status.id = res.data.status.id;  // no change, using "status"
         status.name = res.data.status.name;
     })
     .catch(err => {
         console.log(err);
     });
 };
 
 const status = reactive({
     id: "",      // added 'id' here to prevent undefined error
     name: ""
 });
 
 const updatestatus = () => {
    api.put("/status/" + status.id, status)  // <-- fixed this line
    .then(res => {
        console.log(res);
        router.push({ path: '/status' });
    })
    .catch(err => {
        console.log(err);
    });
};

 </script>
 
 <style>
 
 </style>
 