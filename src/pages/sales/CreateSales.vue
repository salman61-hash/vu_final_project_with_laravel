<template>
  <!-- Invoice Main Card -->
  <div class="card">
    <h2>🧾 Sales Invoice</h2>

    <!-- Customer Selection Section -->
    <div class="d-flex mb-4 customer-details">
      <!-- Customer Dropdown & Info -->
      <div class="col-sm-6 text-sm-start">
        <h5 class="pb-2">Customer</h5>
        <select v-model="dataObj.selectedCustomer" class="form-control wide-select">
          <option disabled :value="null">Select Customer</option>
          <option v-for="c in customers" :key="c.id" :value="c">{{ c.name }}</option>
        </select>
        <p>Phone : {{ dataObj.selectedCustomer?.phone || '-' }}</p>
        <p>Email : {{ dataObj.selectedCustomer?.email || '-' }}</p>
        <p>Address : {{ dataObj.selectedCustomer?.address || '-' }}</p>
      </div>

      <!-- Invoice Number & Date Show -->
      <div class="col-sm-6 text-end invoice-details">
        <strong>Invoice Details:</strong><br>
        Invoice #: SAL-{{ invoiceNumber }}<br>
        Date: {{ todayDate }}
      </div>
    </div>

    <!-- Clear All Button -->
    <div class="text-end mt-3 clear_all">
      <button type="button" class="btn btn-danger" @click="clearAll">Clear All</button>
    </div>

    <!-- Product & Cart Table Section -->
    <div class="table-responsive">
      <table class="table wide-table">
        <thead>
          <tr class="first_row">
            <!-- Table Header for Cart -->
            <th style="width: 3%">Sl</th>
            <th style="width: 10%">Product</th>
            <th style="width: 10%">Cupon</th>
            <th style="width: 5%">Qty</th>
            <th style="width: 8%">Purchase Price</th>
            <th style="width: 8%">Selling Price</th>
            <th style="width: 8%">Total</th>
            <th style="width: 8%">Discount</th>
            <th style="width: 8%">Sub-total</th>
            <th style="width: 8%">Profit</th>
            <th style="width: 5%">Action</th>
          </tr>
        </thead>

        <tbody>
          <!-- Add Product Row (New Product Insert) -->
          <tr>
            <td>1</td>
            <td>
              <!-- Product Dropdown Select -->
              <select v-model="dataObj.selectedProduct" class="form-control wide-select" @change="updateSellingPrice">
                <option disabled :value="null">Select Product</option>
                <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}</option>
              </select>
            </td>
            <td>
              <!-- Coupon Dropdown Select -->
              <select v-model="dataObj.selectedcupon" class="form-control wide-select">
                <option disabled :value="null">Select Cupon</option>
                <option v-for="cupon in cupons" :key="cupon.id" :value="cupon">{{ cupon.name }}</option>
              </select>
            </td>
            <td>
              <!-- Quantity Input -->
              <input v-model.number="dataObj.qty" type="number" class="form-control" min="1">
            </td>
            <td>
              <!-- Auto show Purchase Price -->
              <input :value="dataObj.selectedProduct?.purchase_price || 0" type="text" class="form-control" disabled>
            </td>
            <td>
              <!-- Selling Price Editable -->
              <input v-model.number="dataObj.sellingPrice" type="number" class="form-control">
            </td>
            <td>
              <!-- Auto calculate Total (sellingPrice * qty) -->
              <input :value="calculateTotal" type="text" class="form-control" disabled>
            </td>
            <td>
              <!-- Auto show Discount from cupon -->
              <input :value="dataObj.selectedcupon?.discount || 0" type="text" class="form-control" disabled>
            </td>
            <td>
              <!-- Auto calculate Sub-total (total - discount) -->
              <input :value="calculateSubTotal" type="text" class="form-control" disabled>
            </td>
            <td>
              <!-- Auto calculate Profit -->
              <input :value="calculateProfit" type="text" class="form-control" disabled>
            </td>
            <td>
              <!-- Add to Cart Button -->
              <button type="button" class="btn btn-success" @click="addToCart">Add</button>
            </td>
          </tr>

          <!-- Cart List Display -->
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.cupon ? item.cupon.name : '-' }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.product.purchase_price }}</td>
            <td>{{ item.sellingPrice }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.subTotal }}</td>
            <td>{{ item.profit }}</td>
            <td>
              <!-- Remove Item Button -->
              <button type="button" class="btn btn-danger" @click="itemRemove(index)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Total Calculation Show -->
    <div class="text-end total-section">
      <p class="total-summary">Subtotal: <span>{{ cart.subTotal }}</span></p>
      <p class="total-summary">Vat (10%): <span>{{ cart.vat }}</span></p>
      <p class="total-summary">Grand Total: <span>{{ cart.grandTotal }}</span></p>
    </div>

    <!-- Payment Status & Total Discount -->
    <div class="container payment-section">
      <p class="total-summary text-start">Total-Discount: <span>{{ cart.totalDiscount }}</span></p>
      <div class="mb-3">
        <label for="payment_status_id" class="form-label">Payment Status</label>
        <select v-model="dataObj.paymentStatus" class="form-control wide-select">
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Partial">Partial</option>
        </select>
      </div>
    </div>

    <!-- Process Invoice Button -->
    <div class="text-center mt-5">
      <button type="button" class="btn btn-primary btn-lg px-4 py-2 shadow process-btn" @click="processInvoice">
        🧾 Process Invoice
      </button>
    </div>
  </div>
</template>

<script setup>
// Importing Vue Composition API functions & own cart store
import { ref, reactive, computed, onMounted } from 'vue';

import api from '@/Api';  // custom axios setup
import { useCart } from '../cart/Cart';

// Cart Store Access
const cart = useCart();

// Customer, Product, Cupon data
const customers = ref([]);
const products = ref([]);
const cupons = ref([]);

// Cart Items list
const cartItems = ref(cart.getCart());

// Form Data Object - input bindings
const dataObj = reactive({
  selectedCustomer: null,
  selectedProduct: null,
  selectedcupon: null,
  qty: 1,
  sellingPrice: 0,
  paymentStatus: 'Paid'
});

// Invoice Number & Date
const invoiceNumber = ref("1001");
const todayDate = new Date().toLocaleDateString();

// Fetching customer, product, cupon from API
const saleData = () => {
  api.get("/sales")
    .then(result => {
      customers.value = result.data.customers;
      products.value = result.data.products;
      cupons.value = result.data.cupons;
    })
    .catch(err => console.error(err));
};

// Product select হলে selling price set হবে
const updateSellingPrice = () => {
  if (dataObj.selectedProduct) {
    dataObj.sellingPrice = dataObj.selectedProduct.selling_price;
  }
};

// Calculate Total (Qty * Selling Price)
const calculateTotal = computed(() => {
  if (!dataObj.selectedProduct || !dataObj.sellingPrice) return 0;
  return dataObj.qty * dataObj.sellingPrice;
});

// Calculate Subtotal (Total - Discount)
const calculateSubTotal = computed(() => {
  const discount = dataObj.selectedcupon?.discount || 0;
  return calculateTotal.value - discount;
});

// Profit Calculation (SubTotal - Purchase Cost)
const calculateProfit = computed(() => {
  const purchaseTotal = (dataObj.selectedProduct?.purchase_price || 0) * dataObj.qty;
  return calculateSubTotal.value - purchaseTotal;
});

// Cart-এ Item Add করার Logic
const addToCart = () => {
  if (!dataObj.selectedProduct || !dataObj.selectedProduct.id) {
    alert("Please select a valid product!");
    return;
  }
  if (!dataObj.qty || dataObj.qty < 1) {
    alert("Please enter a valid quantity!");
    return;
  }

  const discount = dataObj.selectedcupon?.discount || 0;

  cart.save({
    product: dataObj.selectedProduct,
    cupon: dataObj.selectedcupon,
    qty: dataObj.qty,
    sellingPrice: dataObj.sellingPrice,
    total: calculateTotal.value,
    discount: discount,
    subTotal: calculateSubTotal.value,
    profit: calculateProfit.value
  });

  cartItems.value = cart.getCart();

  // Input Reset
  dataObj.selectedProduct = null;
  dataObj.selectedcupon = null;
  dataObj.qty = 1;
  dataObj.sellingPrice = 0;
};

// Cart থেকে item remove
const itemRemove = (id) => {
  cart.deleteItem(id);
  cartItems.value = cart.getCart();
};

// Cart Clear করার Logic
const clearAll = () => {
  cart.clearCart();
  cartItems.value = cart.getCart();
  dataObj.selectedCustomer = null;
  dataObj.paymentStatus = 'Paid';
};

// Invoice Process করার Logic
const processInvoice = () => {
  if (!dataObj.selectedCustomer || !dataObj.selectedCustomer.id) {
    alert("Please select a customer!");
    return;
  }
  if (cartItems.value.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const invoiceData = {
    customer_id: dataObj.selectedCustomer.id,
    items: cartItems.value.map(item => ({
      product_id: item.product.id,
      cupon_id: item.cupon?.id || null,
      quantity: item.qty,
      selling_price: item.sellingPrice,
      discount: item.discount,
      total: item.total,
      sub_total: item.subTotal,
      profit: item.profit
    })),
    payment_status: dataObj.paymentStatus,
    invoice_number: `SAL-${invoiceNumber.value}`,
    invoice_date: todayDate,
    subtotal: cart.subTotal,
    vat: cart.vat,
    total_discount: cart.totalDiscount,
    grand_total: cart.grandTotal
  };

  api.post('/sales', invoiceData)
    .then(() => {
      alert("Invoice Processed Successfully!");
      clearAll();
      invoiceNumber.value = parseInt(invoiceNumber.value) + 1;
    })
    .catch(err => {
      console.error(err);
      alert("Error processing invoice!");
    });
};

// Component Load হলেই Data Fetch
onMounted(() => {
  saleData();
});
</script>


<style scoped>
.card {
  padding: 25px;
  margin: 20px auto;
  max-width: 98%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.wide-table {
  width: 100% !important;
  table-layout: auto;
}

.table-responsive {
  overflow-x: auto;
  width: 100%;
}

.table th, .table td {
  padding: 12px 15px;
  white-space: nowrap;
}

.first_row {
  background-color: #f8f9fa;
  font-weight: bold;
}

.total-summary {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 15px 0;
}

.total-summary span {
  color: #0d6efd;
  font-size: 1.3rem;
}

.clear_all {
  margin-bottom: 25px;
}

.wide-select {
  min-width: 200px;
}
</style>
