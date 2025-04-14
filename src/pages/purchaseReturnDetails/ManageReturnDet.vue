<template>
    <div class="container mt-4">
      <div class="card shadow-lg">
        <!-- Header with Add Button -->
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Purchase Return Details List</h4>
          <RouterLink to="/create_purchase_return_detasils" class="btn btn-light">
            <i class="fas fa-plus-circle"></i> Add Purchase Return Details
          </RouterLink>
        </div>
  
        <!-- Search Bar -->
        <div class="mb-3 mt-3">
          <form class="d-flex justify-content-center" @submit.prevent="fetchPurchase_return_details">
            <div class="input-group" style="max-width: 400px">
              <input 
                v-model="search" 
                @input="fetchPurchase_return_details" 
                class="form-control rounded" 
                placeholder="Search..." 
              />
              <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                <i class="fas fa-search me-2"></i> Search
              </button>
            </div>
          </form>
        </div>
  
        <!-- Purchase Return Table -->
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="table-success">
                <tr>
                  <th>ID</th>
                  <th>Sales Return Id</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Total Discount</th>
                  <th>VAT</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="purchase_return_detail in purchase_returns_details.data" 
                  :key="purchase_return_detail.id"
                >
                  <td>{{ purchase_return_detail.id }}</td>
                  <td>{{ purchase_return_detail.salereturn_id }}</td>
                  <td>{{ purchase_return_detail.product?.name }}</td>
                  <td>{{ purchase_return_detail.description }}</td>
                  <td>{{ purchase_return_detail.quantity }}</td>
                  <td>{{ purchase_return_detail.price }}</td>
                  <td>{{ purchase_return_detail.total }}</td>
                  <td>{{ purchase_return_detail.discount }}</td>
                  <td>{{ purchase_return_detail.total_discount }}</td>
                  <td>{{ purchase_return_detail.vat }}</td>
                  <td>
                    <RouterLink 
                      class="btn btn-sm btn-info me-2" 
                      :to="`/purchaseDetails_return/${purchase_return_detail.id}`"
                    >
                      Show <i class="fas fa-eye"></i>
                    </RouterLink>
                    <RouterLink 
                      class="btn btn-sm btn-warning me-2" 
                      :to="`/purchaseDetails_return/edit/${purchase_return_detail.id}`"
                    >
                      Update <i class="fas fa-edit"></i>
                    </RouterLink>
                    <button 
                      class="btn btn-danger btn-sm" 
                      @click="deletepurchase_return(purchase_return_detail.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
  
                <tr v-if="purchase_returns_details.data === 0">
                  <td colspan="11" class="text-center text-danger">
                    No Purchase Return Details Found
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
                  <a 
                    href="#" 
                    class="page-link" 
                    v-html="formatPageLabel(page.label)"
                    @click.prevent="page.url && fetchPurchase_return_details(page.url)"
                  ></a>
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
  
  // Default safe values
  const purchase_returns_details = ref({ data: [] });
  const search = ref('');
  const pagination = ref({ links: [] });
  
  // Fetch Data on Mount
  onMounted(() => {
    fetchPurchase_return_details();
  });
  
  // Fetch Purchase Return Details
  const fetchPurchase_return_details = (url = "/purchaseDetails_return") => {
    if (typeof url !== "string") {
      url = "/purchaseDetails_return";
    }
  
    api.get(url, { params: { search: search.value } })
      .then((res) => {
        purchase_returns_details.value = res.data.data ? res.data.data : { data: [] };
        pagination.value = res.data || { links: [] };
      })
      .catch((err) => {
        console.error("Error fetching purchase return details:", err);
        purchase_returns_details.value = { data: [] };
        pagination.value = { links: [] };
      });
  };
  
  // Pagination Button Text Formatter
  const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "«";
    if (label === "Next &raquo;") return "»";
    return label;
  };
  
  // Dummy Delete Function
  const deletepurchase_return = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      api.delete(`/purchaseDetails_return/${id}`)
        .then(() => {
          fetchPurchase_return_details(); // Refresh list
        })
        .catch((err) => {
          console.error("Failed to delete purchase return detail:", err);
        });
    }
  };
  </script>
  
  <style scoped>
  .table td, .table th {
    vertical-align: middle;
  }
  </style>
  