<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="card shadow-sm rounded">
              <div class="card-body">
                <h2 class="mb-4">Stock Report</h2>
  
                <form @submit.prevent="fromSubmit">
                  <div class="row mb-3 g-3">
                    <div class="col-md-4">
                      <label for="start_date" class="form-label">Start Date</label>
                      <input v-model="ObjSearch.start_date" type="date" id="start_date" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                      <label for="end_date" class="form-label">End Date</label>
                      <input v-model="ObjSearch.end_date" type="date" id="end_date" class="form-control" required>
                    </div>
  
                    <div class="col-md-4">
                      <label for="product_id" class="form-label">Select Product</label>
                      <select v-model="ObjSearch.product_id" id="product_id" class="form-control">
                        <option value="">All Products</option>
                        <option v-for="p in product" :key="p.id" :value="p.id">
                          {{ p.name }}
                        </option>
                      </select>
                    </div>
  
                    <div class="col-md-4 d-flex align-items-end">
                      <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                    </div>
                  </div>
                </form>
  
                <table v-if="stockData.length > 0" class="table table-bordered table-hover mt-4">
                  <thead class="table-success text-dark">
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Remarks</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in stockData" :key="data.id">
                      <td>{{ data.id }}</td>
                      <td>{{ getProductName(data.product_id) }}</td>
                      <td>{{ data.quantity }}</td>
                      <td>{{ data.remarks }}</td>
                      <td>{{ data.created_at }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="4" class="text-end">Total Quantity:</th>
                      <th>{{ totalAmount }}</th>
                    </tr>
                  </tfoot>
                </table>
  
                <p v-else class="mt-4 text-center text-muted">No stock records found for the selected date range.</p>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/Api';
  import { onMounted, reactive, ref } from 'vue';
  
  const stockData = ref([]);
  const product = ref([]);
  const totalAmount = ref(0);
  
  const ObjSearch = reactive({
    start_date: "",
    end_date: "",
    product_id: "",
  });
  
  const loadInitialData = () => {
    api.get("stock_data")
      .then(result => {
        product.value = result.data.product;
      })
      .catch(err => console.error(err));
  };
  
  const fromSubmit = () => {
    api.post("/stockReport", ObjSearch)
      .then(result => {
        stockData.value = result.data.purchases;
        totalAmount.value = result.data.totalAmount;
      })
      .catch(err => console.error(err));
  };
  
  const getProductName = (id) => {
    const p = product.value.find(s => s.id === id);
    return p ? p.name : "Unknown Product";
  };
  
  onMounted(() => {
    loadInitialData();
  });
  </script>
  
  <style>
  .card {
    border: 1px solid #dee2e6;
    border-radius: 0.5rem;
  }
  h2 {
    color: #007bff;
  }
  .table th,
  .table td {
    vertical-align: middle;
  }
  </style>
  