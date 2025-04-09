<template>
    <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Coupons List</h4>
            <RouterLink to="/create_coupons" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Coupons
            </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchcoupons" class="form-control rounded"
                            placeholder="Search..." />
                        <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                            <i class="fas fa-search me-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>


          

           

            <!-- coupon Table -->
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Coupons Name</th>
                                <th>Discount</th>
                                
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="coupon in coupons.data" :key="coupon.id">
                                <td>{{ coupon.id }}</td>
                                <td>{{ coupon.name }}</td>                               
                                <td>{{ coupon.discount }}</td>
                                
                                <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/coupons/${coupon.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/coupons/edit/${coupon.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deletecoupon(coupon.id)">
                                    Delete
                                </button>
                            </td>
                            </tr>
                            <tr v-if="coupons.data && coupons.data.length === 0">
                                <td colspan="6" class="text-center text-danger">
                                    No coupons Found
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
                                    @click.prevent="page.url && fetchcoupons(page.url)">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';



const coupons = ref({ data: [] });
const search = ref("");
const pagination = ref({});


const fetchcoupons = (url = "/coupons") => {
  if (typeof url !== "string") {
    url = "/coupons";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      console.log(result.data.data);
      coupons.value = result.data;
      pagination.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// search
// const debouncedFetchcoupons = fetchcoupons;

onMounted(() => {
    fetchcoupons();
  
});


// pagination
const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};


const deletecoupon = (id)=>{
    api.delete(`/coupons/${id}`)
            .then((res)=>{
                console.log(res);
                fetchcoupons();
                
            }).catch(err => {
      console.log(err);
    });
}




</script>

<style scoped>
.page-link {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
}

.page-item.disabled .page-link {
  pointer-events: none;
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>