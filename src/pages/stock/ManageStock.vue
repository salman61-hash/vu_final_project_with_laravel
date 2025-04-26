<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <!-- Header with Add Button -->
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Stock List</h4>
        <RouterLink to="/create_stock" class="btn btn-light">
          <i class="fas fa-plus-circle"></i> Add Stock
        </RouterLink>
      </div>

      <!-- Search Bar -->
      <div class="mb-3 mt-3">
        <form class="d-flex justify-content-center" @submit.prevent>
          <div class="input-group" style="max-width: 400px">
            <input v-model="search" @input="fetchstock" class="form-control rounded" placeholder="Search..." />
            <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
              <i class="fas fa-search me-2"></i> Search
            </button>
          </div>
        </form>
      </div>

      <!-- stock Table -->
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <!-- <th>Remarks</th> -->
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in stocks" :key="stock.id">
                <td>{{ stock.id }}</td>
                <td>{{ stock.name }}</td>
                <td>{{ stock.quantity }}</td>
                <!-- <td>{{ stock.remarks || 'N/A' }}</td> -->
                <td>
                  <RouterLink class="btn btn-sm btn-info me-2" :to="`/stock/${stock.id}`">
                    Show <i class="fas fa-eye"></i>
                  </RouterLink>
                  <RouterLink class="btn btn-sm btn-warning me-2" :to="`/stock/edit/${stock.id}`">
                    Update <i class="fas fa-edit"></i>
                  </RouterLink>
                  <button class="btn btn-danger btn-sm" @click="deletestock(stock.id)">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="stocks.length === 0">
                <td colspan="6" class="text-center text-danger">
                  No stocks Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.links" class="d-flex justify-content-center mt-3">
          <nav>
            <ul class="pagination pagination-sm">
              <li
                v-for="(page, index) in pagination.links"
                :key="index"
                class="page-item"
                :class="{ active: page.active, disabled: !page.url }"
              >
                <a href="#" class="page-link" v-html="formatPageLabel(page.label)" @click.prevent="page.url && fetchstock(page.url)">
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

const stocks = ref([]);         // Now a simple array
const search = ref("");
const pagination = ref({});

const fetchstock = (url = "/stocks") => {
  if (typeof url !== "string") {
    url = "/stocks";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      console.log(result.data);               // Optional: inspect structure
      stocks.value = result.data.stocks;      // Use `stocks` array
      pagination.value = result.data;         // Assuming pagination is here
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  fetchstock();
});

const deletestock = (id) => {
  if (confirm("Are you sure you want to delete this stock?")) {
    api.delete(`/stocks/${id}`).then(() => {
      fetchstock();
    });
  }
};

const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};
</script>

<style>
/* Add your styles if needed */
</style>
