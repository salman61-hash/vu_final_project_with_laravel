<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <!-- Header with Add Button -->
      <div
        class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
      >
        <h4 class="mb-0">User List</h4>
        <button
          type="button"
          class="btn btn-light"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="fas fa-plus-circle"></i> Add User
        </button>
      </div>

      <!-- Search Bar -->
      <div class="mb-3 mt-3">
        <form class="d-flex justify-content-center">
          <div class="input-group" style="max-width: 400px">
            <input
              v-model="search"
              @input="debouncedFetchUsers"
              class="form-control rounded"
              placeholder="Search..."
            />
            <button
              type="submit"
              class="btn btn-warning d-flex align-items-center rounded"
            >
              <i class="fas fa-search me-2"></i> Search
            </button>
          </div>
        </form>
      </div>

      <!-- Modal for Adding User -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form
          @submit.prevent="createUser"
          id="add_employee_form"
          enctype="multipart/form-data"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Add User
                </h1>
                <button
                  type="button"
                  class="btn-close m-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label class="form-label">Name:</label>
                  <input
                    v-model="userData.name"
                    class="form-control"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Photo:</label>
                  <input
                    @change="onFileChange"
                    class="form-control"
                    type="file"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Role:</label>
                  <select
                    v-model="userData.role_id"
                    class="form-select"
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option
                      v-for="role in roles"
                      :key="role.id"
                      :value="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Email:</label>
                  <input
                    v-model="userData.email"
                    class="form-control"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <input type="submit" class="btn btn-primary" value="Add" />
              </div>
            </div>
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
                  <img
                    :src="`${imgUrl}/${user.photo}`"
                    alt="User Photo"
                    width="50"
                  />
                </td>
                <td>{{ user.role_id }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-warning me-2"
                    @click="editUser(user.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Update <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteUser(user.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="users.data && users.data.length === 0">
                <td colspan="6" class="text-center text-danger">
                  No Users Found
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.links" class="d-flex justify-content-center mt-3">
          <nav>
            <ul class="pagination pagination-sm">
              <li
                v-for="(page, index) in pagination.links"
                :key="index"
                class="page-item"
                :class="{ active: page.active, disabled: !page.url }"
              >
                <a
                  href="#"
                  class="page-link"
                  v-html="formatPageLabel(page.label)"
                  @click.prevent="page.url && fetchUsers(page.url)"
                >
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/Api";
import { onMounted, reactive, ref } from "vue";

const users = ref({ data: [] });
const roles = ref([]);
const search = ref("");
const pagination = ref({});
const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

const fetchUsers = (url = "/users") => {
  if (typeof url !== "string") {
    url = "/users";
  }
  api
    .get(url, { params: { search: search.value } })
    .then((result) => {
      console.log(result);
      users.value = result.data;
      pagination.value = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchRoles = () => {
  api
    .get("/roles")
    .then((result) => {
        console.log(result.data.roles);
        
      roles.value = result.data.roles; // Ensure this returns the correct structure
    })
    .catch((err) => {
      console.log(err);
    });
};

const debouncedFetchUsers = fetchUsers;

const formatPageLabel = (label) => {
  if (label === "&laquo; Previous") return "«";
  if (label === "Next &raquo;") return "»";
  return label;
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});

// User form
const userData = reactive({
  id: "",
  name: "",
  photo: "",
  role_id: "", // Ensure role_id is used correctly in the form
  email: "",
});

const onFileChange = (e) => {
  userData.photo = e.target.files[0];
};

const createUser = () => {
  const formData = new FormData();
  for (const key in userData) {
    formData.append(key, userData[key]);
  }

  api
    .post("/users", formData)
    .then(() => {
      fetchUsers();
    })
    .catch((err) => console.log(err));
};

const editUser = (id) => {
  api
    .get(`/users/${id}`)
    .then((res) => {
      Object.assign(userData, res.data);
    })
    .catch((err) => console.log(err));
};

const deleteUser = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    api
      .delete(`/users/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => console.log(err));
  }
};
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
