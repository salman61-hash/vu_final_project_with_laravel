<template>
  <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Sales Return List</h4>
            <RouterLink to="/create_sales_return" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Sales Return
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchsales_return" class="form-control rounded"
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
                                <th>Sales Id</th>
                                <th>Customer</th>
                                <th>Refund Amount</th>
                                <th>Discount</th>
                                <th>Vat</th>
                                <th>Return Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sales_return in sales_returns.data" :key="sales_return.id">
                                <td>{{ sales_return.id }}</td>
                                <td>{{ sales_return.sales_id}}</td>                               
                                <td>{{ sales_return.customer.name }}</td>
                                <td>{{ sales_return.refund_amount }}</td>
                                <td>{{ sales_return.discount }}</td>
                                <td>{{ sales_return.vat }}</td>
                                <td>{{ sales_return.return_date }}</td>
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/sales_return/${sales_return.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/sales_return/edit/${sales_return.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletesales_return(sales_return.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="sales_returns.data && sales_returns.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No sales_returns Found
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
                                    @click.prevent="page.url && fetchsales_return(page.url)">
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


const sales_returns = ref({data:[]});
const search = ref("");
const pagination =ref({});

onMounted(()=>{
  fetchsales_return();
})

const fetchsales_return=(url = "/sales_return")=>{
    if (typeof url !== "string") {
    url = "/sales_return";
  }

  api.get(url, { params: { search: search.value } })
  .then((result) => {
      console.log(result.data);
      sales_returns.value = result.data;
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



const deletesales_return = (id)=>{
    api.delete(`/sales_return/${id}`)
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