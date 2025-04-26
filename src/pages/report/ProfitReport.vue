<template>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card shadow-sm rounded">
            <div class="card-body">
              <h2 class="mb-4">Profit Report</h2>
  
              <form @submit.prevent="formSubmit">
                <div class="row mb-3 g-3">
                  <div class="col-md-4">
                    <label for="start_date" class="form-label">Start Date</label>
                    <input v-model="ObjSearch.start_date" type="date" id="start_date" class="form-control" required>
                  </div>
                  <div class="col-md-4">
                    <label for="end_date" class="form-label">End Date</label>
                    <input v-model="ObjSearch.end_date" type="date" id="end_date" class="form-control" required>
                  </div>
                  <div class="col-md-4 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary w-100">Generate Report</button>
                  </div>
                </div>
              </form>
  
              <table v-if="profitData.length > 0" class="table table-bordered table-hover mt-4">
                <thead class="table-success text-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Remarks</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in profitData" :key="data.id">
                    <td>{{ data.id }}</td>
                    <td>{{ data.name }}</td>
                    <td>{{ data.remarks }}</td>
                    <td>{{ data.amount }}</td>
                    <td>{{ formatDate(data.created_at) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th colspan="3" class="text-end">Total Revenue:</th>
                    <th>{{ totalRevenue }}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th colspan="3" class="text-end">Total Expense:</th>
                    <th>{{ totalExpense }}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th colspan="3" class="text-end">Net Profit:</th>
                    <th>{{ netProfit }}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </table>
  
              <p v-else class="mt-4 text-center text-muted">No records found for the selected date range.</p>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/Api';
  import { ref, reactive } from 'vue';
  
  const profitData = ref([]);
  const totalRevenue = ref(0);
  const totalExpense = ref(0);
  const netProfit = ref(0);
  
  const ObjSearch = reactive({
    start_date: '',
    end_date: ''
  });
  
  const formSubmit = () => {
    api.post("/profitReport", ObjSearch)
      .then(response => {
        profitData.value = response.data.data;
        totalRevenue.value = response.data.totalRevenue;
        totalExpense.value = response.data.totalExpense;
        netProfit.value = response.data.netProfit;
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };
  </script>
  
  <style scoped>
  /* Add if you want any custom CSS */
  </style>
  