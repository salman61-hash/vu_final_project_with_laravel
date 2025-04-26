<template>
  <div class="card-body">
            <form @submit.prevent="createExpense_Type">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="expense_type.name" class="form-control" placeholder="Enter expense_type name" required>
                </div>
               

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save expense_type
                    </button>
                </div>
            </form>
        </div>
</template>

<script setup>
import api from '@/Api';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const expense_type = reactive({
    name:"",
    
})


const createExpense_Type =()=>{
    api.post(`/expense_type`,expense_type)
    .then(res=>{
        console.log(res);
        router.push({path: '/expense_type'})
        
    }).catch(err=>{
        console.log(err);
        
    })
}

</script>

<style>

</style>