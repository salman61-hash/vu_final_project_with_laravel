<template>
 <div class="container mt-4">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Suppliers Details</h4>
          <RouterLink to="/suppliers" class="btn btn-light">
            <i class="fas fa-arrow-left"></i> Back
          </RouterLink>
        </div>
  
        <div class="card-body" v-if="supplier">
          <ul class="list-group">
            <li class="list-group-item"><strong>Name:</strong> {{ supplier.name }}</li>
            <li class="list-group-item"><strong>Phone:</strong> {{ supplier.phone }}</li>
            <li class="list-group-item"><strong>Email:</strong> {{ supplier.email }}</li>
            <li class="list-group-item"><strong>Address:</strong> {{ supplier.address }}</li>
          </ul>
        </div>
  
        <div class="card-body text-center" v-else>
          <p class="text-danger">Loading supplier data...</p>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const supplier = ref(null);

onMounted(()=>{
    fetchsupplier()
})

const fetchsupplier =()=>{
    api.get(`/suppliers/${route.params.id}`)
    .then((res)=>{
             console.log(res);
             supplier.value = res.data.supplier
             
    }).catch((err) => {
        console.log(err);
      });
}



</script>

<style>

</style>