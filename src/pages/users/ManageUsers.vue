<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <!-- Header with Add Button -->
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">User List</h4>
        <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#userModal" @click="resetForm">
          <i class="fas fa-plus-circle"></i> Add User
        </button>
      </div>

      <!-- Search Bar -->
      <div class="mb-3 mt-3">
        <form class="d-flex justify-content-center" @submit.prevent="fetchUsers">
          <div class="input-group" style="max-width: 400px">
            <input v-model="search" class="form-control rounded" placeholder="Search..." />
            <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
              <i class="fas fa-search me-2"></i> Search
            </button>
          </div>
        </form>
      </div>

      <!-- User Table -->
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Photo</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.data" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <img :src="`${imgUrl}/${user.photo}`" alt="User Photo" width="50" />
                </td>
                <td>{{ getRoleName(user.role_id) }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <button class="btn btn-sm btn-warning me-2" @click="editUser(user)" data-bs-toggle="modal" data-bs-target="#userModal">
                    Update <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="users.data.length === 0">
                <td colspan="6" class="text-center text-danger">No Users Found</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.links" class="d-flex justify-content-center mt-3">
          <nav>
            <ul class="pagination pagination-sm">
              <li v-for="(page, index) in pagination.links" :key="index" class="page-item" :class="{ active: page.active, disabled: !page.url }">
                <a href="#" class="page-link" v-html="formatPageLabel(page.label)" @click.prevent="page.url && fetchUsers(page.url)"></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modal for Adding/Editing User -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <form @submit.prevent="submitUser" id="user_form" enctype="multipart/form-data">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="userModalLabel">{{ isEditing ? 'Edit User' : 'Add User' }}</h1>
              <button type="button" class="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Name:</label>
                <input v-model="userData.name" class="form-control" type="text" placeholder="Name" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Photo:</label>
                <input @change="onFileChange" class="form-control" type="file" :required="!isEditing" />
              </div>
              <div class="mb-3">
                <label class="form-label">Role:</label>
                <select v-model="userData.role_id" class="form-select" required>
                  <option value="" disabled>Select Role</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Email:</label>
                <input v-model="userData.email" class="form-control" type="email" placeholder="Email" required />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <input type="submit" class="btn btn-primary" :value="isEditing ? 'Update' : 'Add'" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue';
import api from '@/Api';

const users = ref({ data: [] });
const roles = ref([]);
const search = ref('');
const pagination = ref({});
const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
const isEditing = ref(false);

const userData = reactive({
  id: '',
  name: '',
  photo: null,
  role_id: '',
  email: '',
});

const fetchUsers = (url = '/users') => {
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      users.value = result.data;
      pagination.value = result.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const fetchRoles = () => {
  api
    .get('/roles')
    .then((result) => {
      roles.value = result.data.roles;
    })
    .catch((err) => {
      console.error(err);
    });
};

const formatPageLabel = (label) => {
  if (label === '&laquo; Previous') return '«';
  if (label === 'Next &raquo;') return '»';
  return label;
};

const getRoleName = (roleId) => {
  const role = roles.value.find((role) => role.id === roleId);
  return role ? role.name : 'Unknown';
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    userData.photo = file;
  }
};

const resetForm = () => {
  userData.id = '';
  userData.name = '';
  userData.photo = null;
  userData.role_id = '';
  userData.email = '';
  isEditing.value = false;
};

const editUser = (user) => {
  userData.id = user.id;
  userData.name = user.name;
  userData.photo = null; // Only update if a new file is selected
  userData.role_id = user.role_id;
  userData.email = user.email;
  isEditing.value = true;
};

const submitUser = () => {
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('role_id', userData.role_id);
  formData.append('email', userData.email);
  if (userData.photo) {
    formData.append('photo', userData.photo);
  }

  if (isEditing.value) {
    formData.append('_method', 'PUT');
    api
      .post(`/users/${userData.id}`, formData)
      .then(() => {
        fetchUsers();
        resetForm();
        document.querySelector('#user_form').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
        modal.hide();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .post('/users', formData)
      .then(() => {
        fetchUsers();
        resetForm();
        document.querySelector('#user_form').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('userModal'));
        modal.hide();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

const deleteUser = (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    api
      .delete(`/users/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>


<style scoped>
.page-link {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
}

.page-item.disabled .page-link {
  pointer-events: none;
  color: #6c757d;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>
