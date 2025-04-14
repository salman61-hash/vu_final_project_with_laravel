<template>
    <div class="container mt-4">
        <div class="card shadow-lg">
            <!-- Header with Add Button -->
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Products List</h4>
                <RouterLink to="/create_products" class="btn btn-light">
                    <i class="fas fa-plus-circle"></i> Add Products
                </RouterLink>
            </div>

            <!-- Search Bar -->
            <div class="mb-3 mt-3">
                <form class="d-flex justify-content-center" @submit.prevent="fetchproducts">
                    <div class="input-group" style="max-width: 400px">
                        <input v-model="search" @input="fetchproducts" class="form-control rounded"
                            placeholder="Search..." />
                        <button type="submit" class="btn btn-warning d-flex align-items-center rounded">
                            <i class="fas fa-search me-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>

            <!-- Product Table -->
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="table-success">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Self No</th>
                                <th>Photo</th>
                                <th>Purchase Price</th>
                                <th>Selling Price</th>
                                <th>Stock</th>
                                <th>Min. Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products.data" :key="product.id">
                                <td>{{ product.id }}</td>
                                <td>{{ product.name }}</td>
                                <td>{{ (product.categories?.name) }}</td>
                                <td>
                                    <img :src="`${imgUrl}/${product.photo}`" alt="User Photo" width="50" />
                                </td>
                                <!-- <td>{{ product.photo }}</td> -->
                                <td>{{ product.purchase_price }}</td>
                                <td>{{ product.selling_price }}</td>
                                <td>{{ product.stock }}</td>
                                <td>{{ product.min_stock }}</td>

                                <td>
                                    <RouterLink class="btn btn-sm btn-info me-2" :to="`/products/${product.id}`">
                                        Show <i class="fas fa-eye"></i>
                                    </RouterLink>
                                    <RouterLink class="btn btn-sm btn-warning me-2"
                                        :to="`/products/edit/${product.id}`">
                                        Update <i class="fas fa-edit"></i>
                                    </RouterLink>
                                    <button class="btn btn-danger btn-sm" @click="deleteproduct(product.id)">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="products.data && products.data.length === 0">
                                <td colspan="9" class="text-center text-danger">
                                    No products Found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="pagination.links" class="d-flex justify-content-center mt-3">
                    <nav>
                        <ul class="pagination pagination-sm">
                            <li v-for="(page, index) in pagination.links" :key="index" class="page-item"
                                :class="{ active: page.active, disabled: !page.url }">
                                <a href="#" class="page-link" v-html="formatPageLabel(page.label)"
                                    @click.prevent="page.url && fetchproducts(page.url)">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup>
import api from '@/Api';
import { onMounted, ref } from 'vue';

const products = ref({ data: [] });
const search = ref("");
const pagination = ref({});


const imgUrl = import.meta.env.VITE_IMG_BASE_URL;

onMounted(() => {
    fetchproducts();
});

const fetchproducts = (url = "/products") => {
    if (typeof url !== "string") {
        url = "/products";
    }
    api
        .get(url, { params: { search: search.value } })
        .then((result) => {
            console.log(result.data.data);
            products.value = result.data;
            pagination.value = result.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

// pagination
const formatPageLabel = (label) => {
    if (label === "&laquo; Previous") return "«";
    if (label === "Next &raquo;") return "»";
    return label;
};

const deleteproduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        api
            .delete(`/products/${id}`)
            .then(() => {
                fetchproducts();
            })
            .catch((err) => {
                console.error(err);
            });
    }
};
</script>

<style></style>
