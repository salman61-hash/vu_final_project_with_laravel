<template>
   <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Purchase_Return List</h4>
            <RouterLink to="/create_purchase_return" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Purchase Return
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchPurchase_return" class="form-control rounded"
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
                        <thead class="table-success">
                            <tr>
                                <th>ID</th>
                                <th>Purchase Id</th>
                                <th>Supplier</th>
                                <th>Refund Amount</th>
                                <th>Discount</th>
                                <th>Vat</th>
                                <th>Return Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="purchase_return in purchase_returns.data" :key="purchase_return.id">
                                <td>{{ purchase_return.id }}</td>
                                <td>{{ purchase_return.purchase_id }}</td>                               
                                <td>{{ purchase_return.suppliers.name }}</td>
                                <td>{{ purchase_return.refund_amount }}</td>
                                <td>{{ purchase_return.discount}}</td>
                                <td>{{ purchase_return.vat}}</td>
                                <td>{{ purchase_return.return_date}}</td>
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/purchase_return/${purchase_return.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/purchase_return/edit/${purchase_return.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletepurchase_return(purchase_return.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="purchase_returns.data && purchase_returns.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No purchase_returns Found
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
                                    @click.prevent="page.url && fetchPurchase_return(page.url)">
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


const purchase_returns = ref({data:[]});
const search = ref();
const pagination =ref({});


onMounted(()=>{
    fetchPurchase_return()
});

const fetchPurchase_return =(url = "/purchase_return")=>{
    if (typeof url !== "string") {
    url = "/purchase_return";
  }

  api.get(url, { params: { search: search.value } })
  .then((res) => {
    console.log(res.data);
    purchase_returns.value = res.data;
     pagination.value = res.data;
    
    
  }).catch((err) => {
    
  });

}

// pagination
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};

</script>

<style>

</style>