<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="card shadow-sm rounded">
              <div class="card-body">
                <h2 class="mb-4">Sales Report</h2>
  
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
                      <label for="customer_id" class="form-label">Customer</label>
                      <select v-model="ObjSearch.customer_id" id="customer_id" class="form-control">
                        <option value="">All Customers</option>
                        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                          {{ customer.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label for="payment_status_id" class="form-label">Payment Status</label>
                      <select v-model="ObjSearch.payment_status_id" id="payment_status_id" class="form-control">
                        <option value="">All Statuses</option>
                        <option v-for="p in paymentStatus" :key="p.id" :value="p.id">
                          {{ p.name }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-4 d-flex align-items-end">
                      <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                    </div>
                  </div>
                </form>
  
                <table v-if="purchaseData.length > 0" class="table table-bordered table-hover mt-4">
                  <thead class="table-success text-dark">
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>User</th>
                      <th>sales Date</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in purchaseData" :key="data.id">
                      <td>{{ data.id }}</td>
                      <td>{{ getCustomerName(data.customer_id) }}</td>
                      <td>{{ data.user_id }}</td>
                      <td>{{ data.sale_date }}</td>
                      <td>{{ data.total_amount }}</td>
                      <td>{{ getPaymentStatusName(data.payment_status_id) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colspan="4" class="text-end">Total:</th>
                      <th>{{ totalAmount }}</th>
                      <th></th>
                    </tr>
                  </tfoot>
                </table>
  
                <p v-else class="mt-4 text-center text-muted">No Sales found for the selected date range.</p>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/Api';
  import { ref, reactive, onMounted } from 'vue';
  
  const purchaseData = ref([]);
  const customers = ref([]);
  const paymentStatus = ref([]);
  const totalAmount = ref("0");
  
  const ObjSearch = reactive({
    start_date: "",
    end_date: "",
    customer_id: "",
    payment_status_id: ""
  });
  
  const loadInitialData = () => {
    api.get("/sales_data")
      .then(result => {
        customers.value = result.data.customers;
        paymentStatus.value = result.data.payment_statuses;
      })
      .catch(err => console.error(err));
  };
  
  const fromSubmit = () => {
    api.post("/salesReport", ObjSearch)
      .then(result => {
        purchaseData.value = result.data.purchases;
        totalAmount.value = result.data.totalAmount;
      })
      .catch(err => console.error(err));
  };
  
  const getCustomerName = (id) => {
    const customer = customers.value.find(s => s.id === id);
    return customer ? customer.name : "Unknown Customer";
  };
  
  const getPaymentStatusName = (id) => {
    const status = paymentStatus.value.find(p => p.id === id);
    return status ? status.name : "Unknown Status";
  };
  
  onMounted(() => {
    loadInitialData();
  });
  </script>
  
  <style scoped>
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
  