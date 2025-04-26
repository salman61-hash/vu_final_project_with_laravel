<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Add Expense</h4>
        <RouterLink to="/expense" class="btn btn-light">
          <i class="fas fa-arrow-left"></i> Back
        </RouterLink>
      </div>

      <div class="card-body">
        <form @submit.prevent="createExpense">

          <!-- User Dropdown -->
          <div class="mb-3">
            <label class="form-label">User</label>
            <select v-model="expense.user_id" class="form-select" required>
              <option value="">Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>

          <!-- Expense Type Dropdown -->
          <div class="mb-3">
            <label class="form-label">Expense Type</label>
            <select v-model="expense.expense_type_id" class="form-select" required>
              <option value="">Select Expense Type</option>
              <option v-for="type in expenseTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>

          <!-- Amount -->
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <input v-model="expense.amount" type="number" step="0.01" class="form-control" placeholder="Enter amount" required />
          </div>

          <!-- Expense Date -->
          <div class="mb-3">
            <label class="form-label">Expense Date</label>
            <input v-model="expense.expense_date" type="date" class="form-control" placeholder="Enter expense date" required />
          </div>

          <!-- Submit -->
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save"></i> Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/Api';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const users = ref([]);           // user list
const expenseTypes = ref([]);    // expense type list

const expense = reactive({
  user_id: '',
  expense_type_id: '',
  amount: '',
  expense_date: ''
});

// Create Expense
const createExpense = () => {
  api.post('/expense_save', expense)   // ঠিক ঠিক route url!
    .then(res => {
      console.log(res);
      router.push({ path: '/expense' });
    })
    .catch(err => {
      console.error(err);
    });
};


// Fetch Users & Expense Types from backend
const fetchExpenseData = () => {
  api.get('/expense_data')
    .then(res => {
      users.value = res.data.user;
      expenseTypes.value = res.data.expense_type;
    })
    .catch(err => {
      console.error(err);
    });
};

onMounted(() => {
  fetchExpenseData();
});
</script>

<style>
/* Optional: your styles */
</style>
