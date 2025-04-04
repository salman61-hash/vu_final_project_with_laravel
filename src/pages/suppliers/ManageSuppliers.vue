<template>
    <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Supplier List</h4>
            <RouterLink to="/create_suppliers" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add supplier
            </RouterLink>
        </div>

        <div class="mb-3 mt-3">
            <!-- Search form centered -->
            <!-- <form @submit.prevent="searchSupplier" class="d-flex justify-content-center">
                <div class="input-group" style="max-width: 400px;">
                    <input type="text" v-model="searchQuery" class="form-control rounded" placeholder="Search Supplier..." required>
                    <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                        <i class="fas fa-search me-2"></i> Search
                    </button>
                </div>
            </form> -->
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
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
                        <tr v-for="supplier in suppliers" :key="supplier.id">
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
                        <tr v-if="suppliers.length === 0">
                            <td colspan="6" class="text-center text-danger">No suppliers Found</td>
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
import { onMounted, ref } from 'vue';

const suppliers = ref([]);

onMounted(()=>{
    fetchsuppliers();
})



const fetchsuppliers = ()=>{
    api.get("/suppliers")
        .then(res => {
            console.log(res.data.suppliers);
            suppliers.value = res.data.suppliers;
        })
        .catch(err => {
            console.log(err);
        
        });




 
};


       // Move deleteuser function outside fetchusers
       const deletesupplier = (id) => {
    api.delete(`/suppliers/${id}`)
        .then(res => {
            console.log(res);
            fetchsuppliers(); // Refresh the user list after deletion
        })
        .catch(err => {
            console.log(err);
        });
}
</script>

<style>

</style>