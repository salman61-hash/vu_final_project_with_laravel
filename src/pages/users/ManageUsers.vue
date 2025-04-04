<template>
     <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Users List</h4>
            <RouterLink to="/create_users" class="btn btn-light">
                <i class="fas fa-plus-circle"></i> Add Users
            </RouterLink>
        </div>

        <div class="mb-3 mt-3">
            <!-- Search form centered -->
            <form @submit.prevent="searchUsers" class="d-flex justify-content-center">
                <div class="input-group" style="max-width: 400px;">
                    <input type="text" v-model="searchQuery" class="form-control rounded" placeholder="Search customers..." required>
                    <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                        <i class="fas fa-search me-2"></i> Search
                    </button>
                </div>
            </form>
        </div>

        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Photo</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role_id }}</td>
                            <td>{{ user.Photo }}</td>
                            <td>{{ user.created_at }}</td>

                            
                           
                           
                            <td>
                                <RouterLink class="btn btn-sm btn-info me-2" :to="'/show/' + user.id">
                                    Show <i class="fas fa-eye"></i>
                                </RouterLink>
                                <RouterLink class="btn btn-sm btn-warning me-2" :to="'/edit/' + user.id">
                                    Update <i class="fas fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger btn-sm" @click="deleteuser(user.id)">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr v-if="users.length === 0">
                            <td colspan="6" class="text-center text-danger">No user Found</td>
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

const users = ref([]);

onMounted(() => {
    fetchusers();
});

const fetchusers = () => {
    api.get("/users")
        .then(res => {
            console.log(res.data.user);
            users.value = res.data.user;
        })
        .catch(err => {
            console.log(err);
        });
};

// Move deleteuser function outside fetchusers
const deleteuser = (id) => {
    api.delete(`/users/${id}`)
        .then(res => {
            console.log(res);
            fetchusers(); // Refresh the user list after deletion
        })
        .catch(err => {
            console.log(err);
        });
};
</script>


<style>

</style>