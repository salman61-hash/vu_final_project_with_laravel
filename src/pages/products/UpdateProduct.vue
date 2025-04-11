<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Update Product</h4>
        <RouterLink to="/products" class="btn btn-light">
          <i class="fas fa-arrow-left"></i> Back
        </RouterLink>
      </div>

      <div class="card-body">
        <form @submit.prevent="UpdateProducts">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" v-model="product.name" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Self no</label>
            <input type="text" v-model="product.category_id" class="form-control" required />
          </div>

          <!-- <div class="mb-3">
            <label class="form-label">Self no</label>
            <select v-model="product.category_id" class="form-select" name="category" required>
              <option value="">Select Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div> -->

          <div v-if="product.photo && !(product.photo instanceof File)" class="mb-3">
            <label class="form-label">Existing Photo:</label>
            <img :src="`/uploads/products/${product.photo}`" alt="Product Image" width="100" />
          </div>

          <div class="mb-3">
            <label class="form-label">Upload New Photo:</label>
            <input @change="onFileChange" class="form-control" type="file" />
          </div>

          <div class="mb-3">
            <label class="form-label">Purchase Price</label>
            <input v-model="product.purchase_price" type="number" step="0.01" class="form-control"  required />
          </div>

          <div class="mb-3">
            <label class="form-label">Selling Price</label>
            <input v-model="product.selling_price" type="number" step="0.01" class="form-control"  required />
          </div>

          <div class="mb-3">
            <label class="form-label">Stock</label>
            <input v-model="product.stock" type="number" class="form-control"  required />
          </div>

          <div class="mb-3">
            <label class="form-label">Minimum Stock Level</label>
            <input v-model="product.min_stock" type="number" class="form-control"  required />
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save"></i> Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import api from '@/Api';
import router from '@/router';
import { onMounted, reactive} from 'vue';
import { useRoute } from 'vue-router';

const { id } = useRoute().params



const product = reactive({

  id: '',
  name: '',
  category_id: '',
  photo: '',
  purchase_price: '',
  selling_price: '',
  stock: '',
  min_stock: '',
});

const UpdateProducts=()=>{
    api.put("/products/"+product.id,product)
  .then(res=>{
    console.log(res);

    router.push({ path: '/products' })
  })
  .catch(err =>{
     console.log(err);
  })
}

const fetchProduct =()=>{
    api.get(`/products/${id}`)
    .then((res)=>{
        console.log(res.data);
        product.id=  res.data.id
        product.name=  res.data.name
        product.category_id=  res.data.category_id
    
        product.purchase_price=  res.data.purchase_price
        product.selling_price=  res.data.selling_price
        product.stock=  res.data.stock
        product.min_stock=  res.data.min_stock
        product.photo=  res.data.product.photo

    })
    .catch((err) => {
            console.log(err);
        });
}





onMounted(() => {
 
  fetchProduct();
});
</script>

<style>
/* Optional custom styles */
</style>
