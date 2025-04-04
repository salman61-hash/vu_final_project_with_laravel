<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Update Customer</h4>
            <RouterLink to="customers" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Back
            </RouterLink>
        </div>

        <div class="card-body">
            <form @submit.prevent="UpdateCustomer">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="customer.name" class="form-control" placeholder="Enter customer name" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <input type="text" v-model="customer.phone" class="form-control" placeholder="Enter phone number" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" v-model="customer.email" class="form-control" placeholder="Enter email address" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea v-model="customer.address" class="form-control" rows="3" placeholder="Enter address" required></textarea>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Update Customer
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


const { id } = useRoute().params

onMounted(()=>{
    fetchCustomer()
})

const fetchCustomer =()=>{
    api.get(`/customers/${id}`)
    .then((res)=>{
        console.log(res.data);
        customer.id=  res.data.customer.id
        customer.name=  res.data.customer.name
        customer.phone=  res.data.customer.phone
        customer.email=  res.data.customer.email
        customer.address=  res.data.customer.address

    })
    .catch((err) => {
            console.log(err);
        });
}

const customer = reactive({
  id:"",
  name: "",
  phone: "",
  email: "",
  address: "",
});

const UpdateCustomer=()=>{
    api.put("/customers/"+customer.id,customer)
  .then(res=>{
    console.log(res);

    router.push({ path: '/customers' })
  })
  .catch(err =>{
     console.log(err);
  })
}



</script>

<style>

</style>