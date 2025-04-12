<template>
 <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Purchase Details List</h4>
            <RouterLink to="/create_purchase_details" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Purchase Details
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchpurchse_details" class="form-control rounded"
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
                                <th>Purchase Id</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Vat</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="purchse_detail in purchase_details.data" :key="purchse_detail.id">
                                <td>{{ purchse_detail.id }}</td>
                                <td>{{ purchse_detail.purchase_id }}</td>                               
                                <td>{{ purchse_detail.product?.name }}</td>
                                <td>{{ purchse_detail.quantity }}</td>
                                <td>{{ purchse_detail.price }}</td>
                                <td>{{ purchse_detail.discount }}</td>
                                <td>{{ purchse_detail.vat }}</td>
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/purchase_details/${purchse_detail.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/purchase_details/edit/${purchse_detail.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletepurchse_detail(purchse_detail.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="purchase_details.data && purchase_details.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No purchse_details Found
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
                                    @click.prevent="page.url && fetchpurchse_details(page.url)">
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


const purchase_details = ref({data:[]});
const search = ref("");
const pagination = ref({});

onMounted(()=>{
    fetchpurchse_details()
})

const fetchpurchse_details = (url = "/purchase_details")=>{
    if (typeof url !== "string") {
       url = "/purchase_details";
     }

     api
       .get(url, { params: { search: search.value } })
       .then((result) => {
         console.log(result.data.data);
         purchase_details.value = result.data;
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
   
   const deletepurchse_detail = (id)=>{
       api.delete(`/purchase_details/${id}`)
               .then((res)=>{
                   console.log(res);
                   fetchpurchse_details();
                   
               }).catch(err => {
         console.log(err);
       });
   }









</script>

<style>

</style>