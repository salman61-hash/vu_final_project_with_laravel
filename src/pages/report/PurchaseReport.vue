<template>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
  
                <h2 class="mb-4">Purchase Report</h2>
  
                <form @submit.prevent="fromSubmit">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label for="start_date" class="form-label">Start Date</label>
                      <input v-model="ObjSearch.start_date" type="date" id="start_date" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                      <label for="end_date" class="form-label">End Date</label>
                      <input v-model="ObjSearch.end_date" type="date" id="end_date" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                      <label for="supplier_id" class="form-label">Supplier</label>
                      <select v-model="ObjSearch.supplier_id" id="supplier_id" class="form-control">
                        <option value="">All Suppliers</option>
                        <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                          {{ supplier.name }}
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
                      <button type="submit" class="btn btn-primary">Generate Report</button>
                    </div>
                  </div>
                </form>
  
                <table v-if="purchseData.length > 0" class="table table-bordered mt-4">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Supplier</th>
                      <th>User</th>
                      <th>Purchase Date</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data in purchseData" :key="data.id">
                      <td>{{ data.id }}</td>
                      <td>{{ getSupplierName(data.supplier_id) }}</td>
                      <td>{{ data.user_id }}</td>
                      <td>{{ data.purchase_date }}</td>
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
  
                <p v-else class="mt-4 text-center">No purchases found for the selected date range.</p>
  
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
  
  const purchseData = ref([]);
  const suppliers = ref([]);
  const paymentStatus = ref([]);
  const totalAmount = ref("0");
  
  const ObjSearch = reactive({
    start_date: "",
    end_date: "",
    supplier_id: "",
    payment_status_id: ""
  });
  
  const purChaseReprotData = () => {
    api.get("/purchaseReport/data")
      .then(result => {
        suppliers.value = result.data.suppliers;
        paymentStatus.value = result.data.payment_statuses;
      })
      .catch(err => console.error(err));
  };
  
  const fromSubmit = () => {
    api.post("/purchaseReport", ObjSearch)
      .then(result => {
        purchseData.value = result.data.purchases;
        totalAmount.value = result.data.totalAmount;
      })
      .catch(err => console.error(err));
  };
  
  const getSupplierName = (id) => {
    const supplier = suppliers.value.find(s => s.id === id);
    return supplier ? supplier.name : "Unknown Supplier";
  };
  
  const getPaymentStatusName = (id) => {
    const status = paymentStatus.value.find(p => p.id === id);
    return status ? status.name : "Unknown Status";
};

  
  onMounted(() => {
    purChaseReprotData();
  });
  </script>
  
  <style>
  /* Optional CSS */
  </style>
  