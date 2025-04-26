<template>
  <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Purchase List</h4>
            <RouterLink to="/create_purchase" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Purchase
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchpurchase" class="form-control rounded"
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
                                <th>Supplier</th>
                                <th>Purchase Date</th>
                                <th>Total Amount</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="purchase in purchase.data" :key="purchase.id">
                                <td>{{ purchase.id }}</td>
                                <td>{{ purchase.supplier?.name }}</td>                               
                                <td>{{ purchase.purchase_date }}</td>
                                <td>{{ purchase.total_amount }}</td>
                                <td>{{ purchase.payment_status?.name }}</td>
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/purchase/${purchase.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/purchase/edit/${purchase.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletepurchase(purchase.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="purchase.data && purchase.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No purchases Found
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
                                    @click.prevent="page.url && fetchpurchase(page.url)">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';


const purchase = ref({data:[]});
const search = ref("");
const pagination =ref({});

onMounted(()=>{
    fetchpurchase();
})

const fetchpurchase=(url = "/purchase_manage")=>{
    if (typeof url !== "string") {
    url = "/purchase_manage";
  }

  api.get(url, { params: { search: search.value } })
  .then((result) => {
      console.log(result.data);
    purchase.value = result.data;
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



const deletepurchase = (id)=>{
    api.delete(`/purchase_manage/${id}`)
            .then((res)=>{
                console.log(res);
                fetchpurchase();
                
            }).catch(err => {
      console.log(err);
    });
}

</script>

<style>

</style>