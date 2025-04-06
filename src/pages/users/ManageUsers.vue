<template>
    <div class="row m-1">
        <div class="col-12">
            <h4 class="main-title">List Table</h4>
            <ul class="app-line-breadcrumbs mb-3">
                <li>
                    <a href="#" class="f-s-14 f-w-500">
                        <span>
                            <i class="ph-duotone ph-table f-s-16"></i> Table
                        </span>
                    </a>
                </li>
                <li class="active">
                    <a href="#" class="f-s-14 f-w-500">All Users</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <!-- User Table -->
        <div class="col-xxl-8">
            <div class="card equal-card">
                <div class="card-header">
                    <h5>Add, Edit &amp; Remove Users</h5>
                </div>
                <div class="card-body p-0">
                    <div id="myTable">
                        <div class="list-table-header d-flex justify-content-sm-between mb-3">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">Add</button>

                            <!-- Modal for Adding/Editing User -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <form @submit.prevent="createUser" id="add_employee_form" enctype="multipart/form-data">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Add User</h1>
                                                <button type="button" class="btn-close m-0" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="employee mb-3">
                                                    <label class="form-label">Name:</label>
                                                    <input v-model="userData.name" class="form-control" type="text" placeholder="Name" required>
                                                </div>
                                                <div class="email mb-3">
                                                    <label class="form-label">Email:</label>
                                                    <input v-model="userData.email" class="form-control" type="email" placeholder="Email" required>
                                                </div>
                                                <div class="contact mb-3">
                                                    <label class="form-label">Contact:</label>
                                                    <input v-model="userData.phone" class="form-control" type="text" placeholder="Mobile" required>
                                                </div>
                                                <div class="photo mb-3">
                                                    <label class="form-label">Photo:</label>
                                                    <input @change="onFileChange" class="form-control" type="file" required>
                                                </div>
                                                <div class="role mb-3">
                                                    <label class="form-label">Role:</label>
                                                    <select v-model="userData.role_id" class="form-select" required>
                                                        <option value="" disabled>Select Role</option>
                                                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <input type="submit" class="btn btn-primary" value="Add">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <!-- Search Input -->
                            <form class="app-form app-icon-form">
                                <input v-model="search" @input="debouncedFetchUsers" placeholder="Search..." class="form-control">
                            </form>
                        </div>

                        <!-- User Table -->
                        <div class="overflow-auto app-scroll">
                            <table class="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Photo</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="user in users" :key="user.id">
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.phone }}</td>
                                        <td><img :src="`${imgUrl}/${user.photo}`" alt="User Photo" width="50"></td>
                                        <td>{{ user.role.name }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-success" @click="editUser(user.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                            <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination (Optional) -->
                        <div class="pagination">
                            <ul class="pagination">
                                <li v-for="page in pagination.links" :key="page.label" @click="fetchUsers(page.url)">
                                    <a href="#" class="page">{{ page.label }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import api from '@/Api'; // Import your API module
import { onMounted, ref, reactive } from 'vue';
import { debounce } from 'lodash'; // Import debounce function from lodash

// Refs for data handling
const users = ref([]);
const roles = ref([]);
const search = ref('');
const pagination = ref({});
const imgUrl = import.meta.env.VITE_IMG_BASE_URL; // URL for image base

// Fetch Users
const fetchUsers = (url = '/users') => {
    if (typeof url !== 'string') {
        console.log(url);
        url = '/users'; // Fallback to default if URL is invalid
    }
    api.get(url, { params: { search: search.value } })
        .then((response) => {
            console.log(response.data);
            users.value = response.data.data;
            pagination.value = response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

// Fetch Roles
const fetchRoles = () => {
    api.get('/roles')
        .then((response) => {
            console.log(response.data);
            roles.value = response.data.roles;
        })
        .catch((err) => {
            console.log(err);
        });
};

// Fetch data on component mount
onMounted(() => {
    fetchUsers();
    fetchRoles();
});

// Debounced search to prevent unnecessary API calls
const debouncedFetchUsers = debounce(fetchUsers, 300);

// Reactive object for user data
const userData = reactive({
    name: '',
    email: '',
    photo: '',
    role_id: '',
    mobile: '',
});

// Handle file input change (for photo upload)
const onFileChange = (event) => {
    userData.photo = event.target.files[0];
};

// Create user
const createUser = () => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('photo', userData.photo);
    formData.append('mobile', userData.mobile);
    formData.append('role_id', userData.role_id);

    api.post('/users', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((result) => {
        console.log(result);
        fetchUsers(); // Refresh the user list after adding a new user
    })
    .catch((err) => {
        console.log(err);
    });
};

// Edit User (currently a placeholder)
const editUser = (id) => {
    console.log(id);
    // Add your edit logic here (open modal with user data to edit)
};
</script>


<style scoped>

</style>
