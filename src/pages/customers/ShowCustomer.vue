<template>
    <div class="container mt-4">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Customer Details</h4>
          <RouterLink to="/customers" class="btn btn-light">
            <i class="fas fa-arrow-left"></i> Back
          </RouterLink>
        </div>
  
        <div class="card-body" v-if="customer">
          <ul class="list-group">
            <li class="list-group-item"><strong>Name:</strong> {{ customer.name }}</li>
            <li class="list-group-item"><strong>Phone:</strong> {{ customer.phone }}</li>
            <li class="list-group-item"><strong>Email:</strong> {{ customer.email }}</li>
            <li class="list-group-item"><strong>Address:</strong> {{ customer.address }}</li>
          </ul>
        </div>
  
        <div class="card-body text-center" v-else>
          <p class="text-danger">Loading customer data...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import api from '@/Api';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const customer = ref(null);
  
  onMounted(() => {
    fetchCustomer();
  });
  
  const fetchCustomer = () => {
    api.get(`/customers/${route.params.id}`)
      .then((res) => {
        customer.value = res.data.customer;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  </script>
  
  <style>
  </style>
  