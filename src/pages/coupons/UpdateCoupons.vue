<template>
    <div class="container mt-4">
      <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Update Coupon</h4>
          <RouterLink to="/coupons" class="btn btn-light">
            <i class="fas fa-arrow-left"></i> Back
          </RouterLink>
        </div>
  
        <div class="card-body">
          <form @submit.prevent="updateCoupon">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                v-model="coupons.name"
                class="form-control"
                placeholder="Enter coupon name"
                required
              />
            </div>
  
            <div class="mb-3">
              <label class="form-label">Discount</label>
              <input
                type="text"
                v-model="coupons.discount"
                class="form-control"
                placeholder="Enter discount"
                required
              />
            </div>
  
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-success">
                <i class="fas fa-save"></i> Update Coupon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import api from '@/Api';
  import { onMounted, reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  const coupons = reactive({
    id: "",
    name: "",
    discount: ""
  });
  
  const fetchCoupons = () => {
    api.get(`/coupons/${route.params.id}`)
      .then((res) => {
        const data = res.data.coupon;
        coupons.id = data.id;
        coupons.name = data.name;
        coupons.discount = data.discount;
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  const updateCoupon = () => {
    api.put(`/coupons/${coupons.id}`, coupons)
      .then(res => {
        console.log(res);
        router.push({ path: '/coupons' });
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  onMounted(() => {
    fetchCoupons();
  });
  </script>
  
  <style>
  /* Add any styles if needed */
  </style>
  