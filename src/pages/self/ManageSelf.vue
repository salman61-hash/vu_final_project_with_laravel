<template>
      <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Self List</h4>
            <RouterLink to="/create_self" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Self
            </RouterLink>
        </div>

        <div class="mb-3 mt-3">
            <!-- Search form centered -->
            <!-- <form @submit.prevent="searchself" class="d-flex justify-content-center"> -->
                <!-- <div class="input-group" style="max-width: 400px;">
                    <input type="text" v-model="searchQuery" @input="searchself" class="form-control rounded" placeholder="Search customers...">

                    <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                        <i class="fas fa-search me-2"></i> Search
                    </button>
                </div> -->
            <!-- </form> -->
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                           
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="self in selfs" :key="self.id">
                            <td>{{ self.id }}</td>
                            <td>{{ self.name }}</td>
                           
                            
                            <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="`/customers/${self.id}`">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="`/customers/edit/${self.id}`">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deleteself(self.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr v-if="selfs.length === 0">
                            <td colspan="6" class="text-center text-danger">No self Found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';



const selfs = ref([]);

onMounted(()=>{
    fetchself()
})


const fetchself=()=>{
    api.get(`/self`)
    .then((res)=>{
        console.log(res.data.selfs);

        selfs.value = res.data.selfs
        
    }) .catch(err => {
            console.log(err);

        })


       
}
const deleteself =(id)=>{
            api.delete(`/self/${id}`)
            .then((res)=>{
                console.log(res);
                fetchself();
                
            }).catch(err => {
      console.log(err);
    });
        }
</script>




<style>

</style>