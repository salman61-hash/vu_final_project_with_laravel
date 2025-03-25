<template>
 <div class="container mt-4">
    <div class="card shadow-lg">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Add Customer</h4>
            <RouterLink to="/" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Back
            </RouterLink>
        </div>

        <div class="card-body">
            <form @submit.prevent="createCustomer">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" v-model="customer.name" class="form-control" placeholder="Enter customer name" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Phone</label>
                    <input type="text" v-model="customer.phone" class="form-control" placeholder="Enter phone number" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" v-model="customer.email" class="form-control" placeholder="Enter email address" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea v-model="customer.address" class="form-control" rows="3" placeholder="Enter address" required></textarea>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-save"></i> Save Customer
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

</template>

<script lang="ts" setup>

</script>

<style>

</style>