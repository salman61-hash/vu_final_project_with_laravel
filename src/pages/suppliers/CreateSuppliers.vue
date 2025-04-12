<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add Suppliers</h4>
            <RouterLink to="/suppliers" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Back
            </RouterLink>
        </div>

        <div class="card-body">
            <form @submit.prevent="createSuppliers">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="supplier.name" class="form-control" placeholder="Enter supplier name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Contact Person</label>
                    <input type="text" v-model="supplier.contact_person" class="form-control" placeholder="Enter supplier name" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <input type="text" v-model="supplier.phone" class="form-control" placeholder="Enter phone number" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" v-model="supplier.email" class="form-control" placeholder="Enter email address" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea v-model="supplier.address" class="form-control" rows="3" placeholder="Enter address" required></textarea>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save supplier
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import api from '@/Api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';




const router = useRouter();
const supplier = reactive({
   name:"",
   contact_person:"",
   phone:"",
   email:"",
   address:""
});

const createSuppliers =()=>{

    api.post(`/suppliers`,supplier)
    .then(res=>{
        console.log(res);
        
        router.push({ path: '/suppliers' })
        
    }) .catch(err =>{
     console.log(err);
  })

}

</script>

<style>

</style>