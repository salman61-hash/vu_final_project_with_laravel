<template>
    
    <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Customer List</h4>
            <RouterLink to="/create_customers" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Customer
            </RouterLink>
        </div>

        <div class="mb-3 mt-3">
            <!-- Search form centered -->
            <form @submit.prevent="searchCustomer" class="d-flex justify-content-center">
                <div class="input-group" style="max-width: 400px;">
                    <input type="text" v-model="searchQuery" @input="searchCustomer" class="form-control rounded" placeholder="Search customers...">

                    <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                        <i class="fas fa-search me-2"></i> Search
                    </button>
                </div>
            </form>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in customers" :key="customer.id">
                            <td>{{ customer.id }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.address }}</td>
                            <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/customers/${customer.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/customers/edit/${customer.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletecustomer(customer.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr v-if="customers.length === 0">
                            <td colspan="6" class="text-center text-danger">No Customers Found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>
import api from '@/Api';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const customers = ref([]);
const searchQuery = ref("");


onMounted(() => {
    fetchCustomers()
})

const fetchCustomers= ()=>{
    api.get("/customers")
        .then(res => {
            console.log(res.data.customer);
            customers.value = res.data.customer
        })
        .catch(err => {
            console.log(err);

        })
}

const searchCustomer = () => {
    api.get("/customers", { params: { search: searchQuery.value } })
        .then(res => {
            customers.value = res.data.customers || [];
        })
        .catch(err => {
            console.log(err);
        });
};






const deletecustomer = (id) => {
  api.delete(`/customers/${id}`)
    .then(res => {
      console.log(res);
      fetchCustomers(); // Refresh the customer list after deletion
    })
    .catch(err => {
      console.log(err);
    });
};






</script>

<style>

</style>