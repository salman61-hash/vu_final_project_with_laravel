
<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Add Product</h4>
        <RouterLink to="/products" class="btn btn-light">
          <i class="fas fa-arrow-left"></i> Back
        </RouterLink>
      </div>

      <div class="card-body">
        <form @submit.prevent="createProduct">
          <div class="mb-3">
            <label class="form-label">Product Name</label>
            <input v-model="product.name" type="text" class="form-control" placeholder="Enter product name" required>
          </div>
          
          <div class="mb-3">
            <label class="form-label">Category</label>
            <select v-model="product.category_id" class="form-select" name="category" required>
              <option value="">Select category</option>
              <option v-for="category in categories" :key="categories.id" :value="categories.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Product Image</label>
            <input type="file" @change="onFileChange" class="form-control">
          </div>

          <div class="mb-3">
            <label class="form-label">Purchase Price</label>
            <input v-model="product.purchase_price" type="number" step="0.01" class="form-control" placeholder="Enter purchase price" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Selling Price</label>
            <input v-model="product.selling_price" type="number" step="0.01" class="form-control" placeholder="Enter selling price" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Stock</label>
            <input v-model="product.stock" type="number" class="form-control" placeholder="Enter stock quantity" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Minimum Stock Level</label>
            <input v-model="product.min_stock_level" type="number" class="form-control" placeholder="Enter min stock level" required>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save"></i> Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script  setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const categories = ref([]);


const product = reactive({
  id: '',
  name: '',
  category_id: null,
  purchase_price: null,
  selling_price: null,
  stock: null,
  min_stock_level: null,
  photo: null,
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    product.photo = file;
  }
  console.log(file);
  
};

const createProduct =()=>{

api.post(`/products`,product)
.then(res=>{
    console.log(res);
    router.push({ path: '/products' })
    
}) .catch(err =>{
 console.log(err);
})

}


const fetchcategories = () => {
  api
    .get('/allcategories')
    .then((result) => {
      
      categories.value = result.data;
    })
    .catch((err) => {
      console.error(err);
    });
};



onMounted(()=>{
  fetchcategories();
})

</script>



<style>

</style>