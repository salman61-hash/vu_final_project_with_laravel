<template>
    <div class="card-body">
            <form @submit.prevent="createCoupons">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="coupons.name" class="form-control" placeholder="Enter coupon name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Discounts</label>
                    <input type="text" v-model="coupons.discount" class="form-control" placeholder="Enter coupon name" required>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save coupon
                    </button>
                </div>
            </form>
        </div>
</template>

<script  setup>
import api from '@/Api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


const coupons = reactive({
    name:"",
    discount:""
})

const createCoupons =()=>{
    api.post(`/coupons`,coupons)
    .then(res=>{
        console.log(res);
        router.push({path: '/coupons'})
        
    }).catch(err=>{
        console.log(err);
        
    })
}
</script>

<style>

</style>