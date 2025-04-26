<template>
     <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Expense_Type List</h4>
            <RouterLink to="/create_expense_type" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Expense_Type
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchexpense_type" class="form-control rounded"
                            placeholder="Search..." />
                        <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                            <i class="fas fa-search me-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>


          

           

            <!-- expense_type Table -->
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                               
                                
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="expense_type in expenses_types.data" :key="expense_type.id">
                                <td>{{ expense_type.id }}</td>
                                <td>{{ expense_type.name }}</td>                               
                               
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/expense_type/${expense_type.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/expense_type/edit/${expense_type.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deleteexpense_type(expense_type.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="expenses_types.data && expenses_types.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No expense_types Found
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
                                    @click.prevent="page.url && fetchexpense_type(page.url)">
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


const expenses_types = ref({data:[]});
const search = ref("");
const pagination = ref({});

const fetchexpense_type = (url = "/expense_type") => {
  if (typeof url !== "string") {
    url = "/expense_type";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      console.log(result.data);
      expenses_types.value = result.data;
      pagination.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
    fetchexpense_type();
  
});

// pagination
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};

</script>

<style>

</style>