<template>
 <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Customers List</h4>
            <RouterLink to="/create_customers" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Customers
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchcustomers" class="form-control rounded"
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
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in customers.data" :key="customer.id">
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
                            <tr v-if="customers.data && customers.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No customers Found
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
                                    @click.prevent="page.url && fetchcustomers(page.url)">
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


const customers = ref({ data: [] });
const search = ref("");
const pagination = ref({});


onMounted(() => {
    fetchcustomers();
  
});


const fetchcustomers = (url = "/customers") => {
  if (typeof url !== "string") {
    url = "/customers";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      console.log(result.data.data);
      customers.value = result.data;
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

const deletecustomer = (id)=>{
    api.delete(`/customers/${id}`)
            .then((res)=>{
                console.log(res);
                fetchcustomers();
                
            }).catch(err => {
      console.log(err);
    });
}

</script>

<style>

</style>