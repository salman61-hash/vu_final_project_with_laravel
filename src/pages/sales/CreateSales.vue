<template>
  <div class="card">
    <h2>🧾 Sales Invoice</h2>

    <div class="d-flex mb-4 customer-details">
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

      <div class="col-sm-6 text-end invoice-details">
        <strong>Invoice Details:</strong><br>
        Invoice #: SAL-{{ invoiceNumber }}<br>
        Date: {{ todayDate }}
      </div>
    </div>

    <div class="text-end mt-3 clear_all">
      <button type="button" class="btn btn-danger" @click="clearAll">Clear All</button>
    </div>

    <div class="table-responsive">
      <table class="table wide-table">
        <thead>
          <tr class="first_row">
            <th style="width: 3%">Sl</th>
            <th style="width: 15%">Product</th>
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
          <tr>
            <td>1</td>
            <td>
              <select v-model="dataObj.selectedProduct" class="form-control wide-select" @change="updateSellingPrice">
                <option disabled :value="null">Select Product</option>
                <option v-for="p in products" :key="p.id" :value="p">{{ p.name }}</option>
              </select>
            </td>
            <td>
              <select v-model="dataObj.selectedcupon" class="form-control wide-select">
                <option disabled :value="null">Select Cupon</option>
                <option v-for="cupon in cupons" :key="cupon.id" :value="cupon">{{ cupon.name }}</option>
              </select>
            </td>
            <td><input v-model.number="dataObj.qty" type="number" class="form-control" min="1"></td>
            <td><input :value="dataObj.selectedProduct?.purchase_price || 0" type="text" class="form-control" disabled></td>
            <td><input v-model.number="dataObj.sellingPrice" type="number" class="form-control"></td>
            <td><input :value="calculateTotal" type="text" class="form-control" disabled></td>
            <td><input :value="dataObj.selectedcupon?.discount || 0" type="text" class="form-control" disabled></td>
            <td><input :value="calculateSubTotal" type="text" class="form-control" disabled></td>
            <td><input :value="calculateProfit" type="text" class="form-control" disabled></td>
            <td>
              <button type="button" class="btn btn-success" @click="addToCart">Add</button>
            </td>
          </tr>

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
              <button type="button" class="btn btn-danger" @click="itemRemove(index)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-end total-section">
      <p class="total-summary">Subtotal: <span>{{ cart.subTotal }}</span></p>
      <p class="total-summary">Vat (10%): <span>{{ cart.vat }}</span></p>
      <p class="total-summary">Grand Total: <span>{{ cart.grandTotal }}</span></p>
    </div>

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

    <div class="text-center mt-5">
      <button type="button" class="btn btn-primary btn-lg px-4 py-2 shadow process-btn" @click="processInvoice">🧾 Process Invoice</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useCart } from '../cart/Cart';
import api from '@/Api';

const cart = useCart();
const customers = ref([]);
const products = ref([]);
const cupons = ref([]);
const cartItems = ref(cart.getCart());

const dataObj = reactive({
  selectedCustomer: null,
  selectedProduct: null,
  selectedcupon: null,
  qty: 1,
  sellingPrice: 0,
  paymentStatus: 'Paid'
});

const invoiceNumber = ref("1001");
const todayDate = new Date().toLocaleDateString();

const saleData = () => {
  api.get("/sales")
    .then(result => {
      customers.value = result.data.customers;
      products.value = result.data.products;
      cupons.value = result.data.cupons;
    })
    .catch(err => console.log(err));
};

const updateSellingPrice = () => {
  if (dataObj.selectedProduct) {
    dataObj.sellingPrice = dataObj.selectedProduct.selling_price;
  }
};

const calculateTotal = computed(() => {
  if (!dataObj.selectedProduct || !dataObj.sellingPrice) return 0;
  return dataObj.qty * dataObj.sellingPrice;
});

const calculateSubTotal = computed(() => {
  const discount = dataObj.selectedcupon?.discount || 0;
  return calculateTotal.value - discount;
});

const calculateProfit = computed(() => {
  const purchaseTotal = (dataObj.selectedProduct?.purchase_price || 0) * dataObj.qty;
  return calculateSubTotal.value - purchaseTotal;
});

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

  // Reset form
  dataObj.selectedProduct = null;
  dataObj.selectedcupon = null;
  dataObj.qty = 1;
  dataObj.sellingPrice = 0;
};

// item remove 
const itemRemove= (id)=>{
  console.log(id);
  
  cart.deleteItem(id);
  cartItems.value = cart.getCart();
}
const clearAll = () => {
  cart.clearCart();
  cartItems.value = cart.getCart();
  dataObj.selectedCustomer = null;
  dataObj.paymentStatus = 'Paid';
};

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

.form-control {
  width: 100%;
}

.customer-details, .invoice-details {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.total-section, .payment-section {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.process-btn {
  font-size: 1.1rem;
  padding: 12px 30px;
}

.btn-success {
  min-width: 80px;
}

.btn-danger {
  min-width: 50px;
}
</style>