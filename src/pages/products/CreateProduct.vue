<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Add Products</h4>
        <RouterLink to="/products" class="btn btn-light">
          <i class="fas fa-arrow-left"></i> Back
        </RouterLink>
      </div>

      <div class="card-body">
        <form @submit.prevent="createProducts">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" v-model="product.name" class="form-control" placeholder="Enter customer name" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Self No</label>
            <select v-model="product.category_id" class="form-select" name="category" required>
              <option value="">Select Self No</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Photo:</label>
            <input @change="onFileChange" class="form-control" type="file" />
          </div>
            <!-- photo preview -->
          <div class="mb-3" v-if="previewUrl">
            <label class="form-label">Preview:</label><br />
            <img :src="previewUrl" alt="Photo Preview" style="max-width: 150px; max-height: 150px; border: 1px solid #ddd; padding: 5px;" />
          </div>


          <div class="mb-3">
            <label class="form-label">Purchase Price</label>
            <input v-model="product.purchase_price" type="number" step="0.01" class="form-control" placeholder="Enter purchase price" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Selling Price</label>
            <input v-model="product.selling_price" type="number" step="0.01" class="form-control" placeholder="Enter selling price" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Stock</label>
            <input v-model="product.stock" type="number" class="form-control" placeholder="Enter stock quantity" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Minimum Stock Level</label>
            <input v-model="product.min_stock" type="number" class="form-control" placeholder="Enter min stock level" required />
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save"></i> Save product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/Api';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const categories = ref([]);
const previewUrl = ref(null); // Add this line


const product = reactive({
  name: '',
  category_id: '',
  photo: null,
  purchase_price: '',
  selling_price: '',
  stock: '',
  min_stock: '',
});

const createProducts = () => {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('category_id', product.category_id);
  formData.append('photo', product.photo);
  formData.append('purchase_price', product.purchase_price);
  formData.append('selling_price', product.selling_price);
  formData.append('stock', product.stock);
  formData.append('min_stock', product.min_stock);

  api
    .post('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log(res);
      router.push({ path: '/products' });
    })
    .catch((err) => {
      console.error(err);
    });
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    product.photo = file;
    previewUrl.value = URL.createObjectURL(file); // Show preview
  }
};

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

onMounted(() => {
  fetchcategories();
});
</script>

<style>
/* Optional custom styles */
</style>
