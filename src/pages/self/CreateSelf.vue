<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add Self</h4>
            <RouterLink to="/self" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Back
            </RouterLink>
        </div>

        <div class="card-body">
            <form @submit.prevent="createself">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="selfs.name" class="form-control" placeholder="Enter customer name" required>
                </div>

               

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save self
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import api from '@/Api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter();

const selfs = reactive({
    name:""
})


const createself =()=>{
    api.post(`/self`,selfs)
    .then(res=>{
        console.log(res);
        router.push({path: '/self'})
        
    }).catch(err=>{
        console.log(err);
        
    })
}



</script>

<style>

</style>