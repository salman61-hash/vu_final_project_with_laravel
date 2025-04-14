<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <!-- Header with Add Button -->
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Sales_Details List</h4>
        <RouterLink to="/create_sales_details" class="btn btn-light">
          <i class="fas fa-plus-circle"></i> Add Sales_Details
        </RouterLink>
      </div>

      <!-- Search Bar -->
      <div class="mb-3 mt-3">
        <form class="d-flex justify-content-center" @submit.prevent="fetchSalesDetails">
          <div class="input-group" style="max-width: 400px">
            <input 
              v-model="search" 
              @input="fetchSalesDetails" 
              class="form-control rounded" 
              placeholder="Search..." 
            />
            <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
              <i class="fas fa-search me-2"></i> Search
            </button>
          </div>
        </form>
      </div>

      <!-- Sales Table -->
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-success">
              <tr>
                <th>ID</th>
                <th>Sale Id</th>
                <th>Product</th>
                <th>Cupon</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Vat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale_detail in salesDetails.data" :key="sale_detail.id">
                <td>{{ sale_detail.id }}</td>
                <td>{{ sale_detail.sale_id }}</td>
                <td>{{ sale_detail.product?.name || 'N/A' }}</td>
                <td>{{ sale_detail.cupon?.name || 'N/A' }}</td>
                <td>{{ sale_detail.quantity }}</td>
                <td>{{ sale_detail.price }}</td>
                <td>{{ sale_detail.discount }}</td>
                <td>{{ sale_detail.vat }}</td>
                <td>
                  <RouterLink class="btn btn-sm btn-info me-2" :to="`/sales_details/${sale_detail.id}`">
                    Show <i class="fas fa-eye"></i>
                  </RouterLink>
                  <RouterLink class="btn btn-sm btn-warning me-2" :to="`/sales_details/edit/${sale_detail.id}`">
                    Update <i class="fas fa-edit"></i>
                  </RouterLink>
                  <button class="btn btn-danger btn-sm" @click="deleteSaleDetails(sale_detail.id)">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="salesDetails.data && salesDetails.data.length === 0">
                <td colspan="9" class="text-center text-danger">No sales found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="salesDetails.links && salesDetails.links.length > 0" class="d-flex justify-content-center mt-3">
          <nav>
            <ul class="pagination pagination-sm">
              <li
                v-for="(page, index) in salesDetails.links"
                :key="index"
                class="page-item"
                :class="{ active: page.active, disabled: !page.url }"
              >
                <a href="#" class="page-link" 
                   v-html="formatPageLabel(page.label)" 
                   @click.prevent="page.url && fetchSalesDetails(page.url)">
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

const salesDetails = ref({ data: [] });
const search = ref("");

onMounted(() => {
  fetchSalesDetails();
});

const fetchSalesDetails = (url = "/sales_details") => {
  api.get(url, { params: { search: search.value } })
    .then((res) => {
      console.log(res.data);
      salesDetails.value = res.data;
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
    });
};


const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};
</script>

<style>
/* Optional CSS for customization */
</style>
