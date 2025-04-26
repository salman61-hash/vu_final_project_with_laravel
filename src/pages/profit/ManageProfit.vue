<template>
    <div class="container mt-4">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Profit List</h4>
          <RouterLink to="/create_profit" class="btn btn-light">
            <i class="fas fa-plus-circle"></i> Add Profit
          </RouterLink>
        </div>
  
        <div class="mb-3 mt-3">
          <form class="d-flex justify-content-center" @submit.prevent>
            <div class="input-group" style="max-width: 400px">
              <input v-model="search" @input="fetchProfit" class="form-control rounded" placeholder="Search..." />
              <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                <i class="fas fa-search me-2"></i> Search
              </button>
            </div>
          </form>
        </div>
  
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Remarks</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="profit in profits" :key="profit.id">
                  <td>{{ profit.id }}</td>
                  <td>{{ profit.name }}</td>
                  <td>{{ profit.remarks }}</td>
                  <td>{{ profit.amount }}</td>
                  <td>
                    <RouterLink class="btn btn-sm btn-info me-2" :to="`/profit/${profit.id}`">
                      Show <i class="fas fa-eye"></i>
                    </RouterLink>
                    <RouterLink class="btn btn-sm btn-warning me-2" :to="`/profit/edit/${profit.id}`">
                      Update <i class="fas fa-edit"></i>
                    </RouterLink>
                    <button class="btn btn-danger btn-sm" @click="deleteProfit(profit.id)">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr v-if="profits && profits.length === 0">
                  <td colspan="6" class="text-center text-danger">
                    No profits found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Net Profit Summary -->
          <div class="mt-4">
            <div class="alert alert-info text-center">
              <strong>Total Revenue:</strong> {{ totalRevenue }} |
              <strong>Total Expense:</strong> {{ totalExpense }} |
              <strong>Net Profit:</strong> {{ netProfit }}
            </div>
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
                  <a href="#" class="page-link" v-html="formatPageLabel(page.label)" @click.prevent="page.url && fetchProfit(page.url)">
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
  import { ref, computed, onMounted } from 'vue';
  
  const profits = ref([]);
  const search = ref("");
  const pagination = ref({});
  
  // Computed total revenue
  const totalRevenue = computed(() =>
    profits.value
      .filter(p => p.remarks.toLowerCase() === 'revenue')
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
  );
  
  // Computed total expense
  const totalExpense = computed(() =>
    profits.value
      .filter(p => p.remarks.toLowerCase() === 'expense')
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
  );
  
  // Net profit = revenue - expense
  const netProfit = computed(() => totalRevenue.value - totalExpense.value);
  
  const fetchProfit = (url = "/profit") => {
    if (typeof url !== "string") {
      url = "/profit";
    }
    api
      .get(url, { params: { search: search.value } })
      .then((result) => {
        console.log(result.data);
        profits.value = result.data.data;
        pagination.value = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  onMounted(() => {
    fetchProfit();
  });
  
  const deleteProfit = (id) => {
    if (confirm("Are you sure you want to delete this profit?")) {
      api.delete(`/profit/${id}`).then(() => {
        fetchProfit();
      });
    }
  };
  
  const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "«";
    if (label === "Next &raquo;") return "»";
    return label;
  };
  </script>
  
  <style scoped>
  /* Add your custom styling here if needed */
  </style>
  