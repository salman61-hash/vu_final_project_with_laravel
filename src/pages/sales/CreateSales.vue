<template>
  <div class="card">
    <h2>🧾 Sales Invoice</h2>

    <div class="d-flex mb-4 customer-details">
      <div class="col-sm-6 text-sm-start">
        <h5 class="pb-2">Customer</h5>
        <select
          v-model="dataObj.selectedCustomer"
          class="form-control wide-select"
        >
          <option disabled :value="null">Select Customer</option>
          <option v-for="c in customers" :key="c.id" :value="c">
            {{ c.name }}
          </option>
        </select>
        <p>Phone : {{ dataObj.selectedCustomer?.phone || "-" }}</p>
        <p>Email : {{ dataObj.selectedCustomer?.email || "-" }}</p>
        <p>Address : {{ dataObj.selectedCustomer?.address || "-" }}</p>
      </div>

      <div class="col-sm-6 text-end invoice-details">
        <strong>Invoice Details:</strong><br />
        Invoice #: SAL-{{ invoiceNumber }}<br />
        Date: {{ todayDate }}
      </div>
    </div>

    <div class="text-end mt-3 clear_all">
      <button type="button" class="btn btn-danger" @click="clearAll">
        Clear All
      </button>
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
              <select
                v-model="dataObj.selectedProduct"
                class="form-control wide-select"
                @change="updateSellingPrice"
              >
                <option disabled :value="null">Select Product</option>
                <option v-for="p in products" :key="p.id" :value="p">
                  {{ p.name }}
                </option>
              </select>
            </td>
            <td>
              <select
                v-model="dataObj.selectedcupon"
                class="form-control wide-select"
              >
                <option disabled :value="null">Select Cupon</option>
                <option v-for="cupon in cupons" :key="cupon.id" :value="cupon">
                  {{ cupon.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model.number="dataObj.qty"
                type="number"
                class="form-control"
                min="1"
              />
            </td>
            <td>
              <input
                :value="dataObj.selectedProduct?.purchase_price || 0"
                type="text"
                class="form-control"
                disabled
              />
            </td>
            <td>
              <input
                v-model.number="dataObj.sellingPrice"
                type="number"
                class="form-control"
              />
            </td>
            <td>
              <input
                :value="calculateTotal"
                type="text"
                class="form-control"
                disabled
              />
            </td>
            <td>
              <input
                :value="dataObj.selectedcupon?.discount || 0"
                type="text"
                class="form-control"
                disabled
              />
            </td>
            <td>
              <input
                :value="calculateSubTotal"
                type="text"
                class="form-control"
                disabled
              />
            </td>
            <td>
              <input
                :value="calculateProfit"
                type="text"
                class="form-control"
                disabled
              />
            </td>
            <td>
              <button type="button" class="btn btn-success" @click="addToCart">
                Add
              </button>
            </td>
          </tr>

          <tr v-for="(item, index) in cartItems" :key="item.item_id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.cupon ? item.cupon.name : "-" }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.purchase_price }}</td>
            <td>{{ item.sellingPrice }}</td>
            <td>{{ item.total }}</td>
            <td>{{ item.discount }}</td>
            <td>{{ item.subTotal }}</td>
            <td>{{ item.profit }}</td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="itemRemove(item.item_id)"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="text-end total-section">
      <p class="total-summary">
        Subtotal: <span>{{ dataObj.subTotal }}</span>
      </p>
      <p class="total-summary">
        Vat (10%): <span>{{ dataObj.vat }}</span>
      </p>
      <p class="total-summary">
        Grand Total: <span>{{ dataObj.grandTotal }}</span>
      </p>
    </div>

    <p class="total-summary text-start">
      Total-Discount: <span>{{ dataObj.totalDiscount }}</span>
    </p>

    <select v-model="dataObj.selectedStatus">
      <option disabled :value="null">Select Status</option>
      <option v-for="p in payment_status" :key="p.id" :value="p">
        {{ p.name }}
      </option>
    </select>

    <div class="text-center mt-5">
      <button
        type="button"
        class="btn btn-primary btn-lg px-4 py-2 shadow process-btn"
        @click="processInvoice"
      >
        🧾 Process Invoice
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useCart } from "../cart/Cart";
import api from "@/Api";

const cart = useCart("Sales");

const customers = ref([]);
const products = ref([]);
const cupons = ref([]);
const cartItems = ref(cart.getCart());
const payment_status = ref([]);

const dataObj = reactive({
  selectedCustomer: {},
  selectedProduct: {},
  selectedcupon: {},
  selectedStatus: {},
  qty: 1,
  sellingPrice: 0,
  totalDiscount: 0,
  subTotal: 0,
  vat: 0,
  grandTotal: 0,
});

const grandTotalCalculation = () => {
  const cartData = cart.getCart();

  // Discount যোগফল
  dataObj.totalDiscount = cartData.reduce(
    (acc, ele) => acc + Number(ele.discount || 0),
    0
  );

  // Total Price যোগফল (Discount ছাড়া)
  const totalBeforeDiscount = cartData.reduce(
    (acc, ele) => acc + (ele.total || 0),
    0
  );

  // Discount বাদ দেয়া Subtotal
  dataObj.subTotal = totalBeforeDiscount - dataObj.totalDiscount;

  // Vat = Subtotal এর উপর
  dataObj.vat = (dataObj.subTotal * 10) / 100;

  // GrandTotal = Subtotal + Vat
  dataObj.grandTotal = dataObj.subTotal + dataObj.vat;

  console.log("Total Discount:", dataObj.totalDiscount);
  console.log("Total Before Discount:", totalBeforeDiscount);
  console.log("SubTotal After Discount:", dataObj.subTotal);
  console.log("VAT:", dataObj.vat);
  console.log("Grand Total:", dataObj.grandTotal);
};


const invoiceNumber = ref("1001");
const todayDate = new Date().toLocaleDateString();

const saleData = () => {
  api
    .get("/sales")
    .then((result) => {
      console.log(result.data);
      customers.value = result.data.customers;
      products.value = result.data.products;
      cupons.value = result.data.cupons;
      payment_status.value = result.data.payment_status;
    })
    .catch((err) => console.log(err));
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
  const purchaseTotal =
    (dataObj.selectedProduct?.purchase_price || 0) * dataObj.qty;
  return calculateSubTotal.value - purchaseTotal;
});

const addToCart = () => {
  if (!dataObj.selectedProduct.id) return; // ✅ check product selected

  const discount = dataObj.selectedcupon?.discount || 0;
  const subtotal = calculateSubTotal.value;
  const total = calculateTotal.value;
  const profit = calculateProfit.value;

  const data = {
    item_id: dataObj.selectedProduct.id,
    name: dataObj.selectedProduct.name,
    price: dataObj.sellingPrice,
    purchase_price: dataObj.selectedProduct.purchase_price,
    discount: discount,
    qty: dataObj.qty,
    sellingPrice: dataObj.sellingPrice,
    subTotal: subtotal,
    cupon: dataObj.selectedcupon?.name,
    cupon_id: dataObj.selectedcupon?.id || null,
    profit: profit,
    total: total
  }

  cart.save(data);
  cartItems.value = cart.getCart();
  grandTotalCalculation(); // ✅ must recalculate

  // Reset Form
  dataObj.selectedProduct = {};
  dataObj.qty = 1;
  dataObj.discount = 0;
  
};




const itemRemove = (id) => {
  cart.deleteItem(id);
  cartItems.value = cart.getCart();
  grandTotalCalculation();
};

const clearAll = () => {
  cart.clearCart();
  cartItems.value = cart.getCart();
  dataObj.selectedCustomer = null;
  dataObj.selectedStatus = null;
  grandTotalCalculation();
};

const processInvoice = () => {
  const processData = {
    products: cart.getCart(),
    customer: dataObj.selectedCustomer,
    cupons: dataObj.selectedcupon,
    payment_status: dataObj.selectedStatus,
    discount: dataObj.totalDiscount,
    vat: dataObj.vat,
    grandtotal: dataObj.grandTotal,
  };
  console.log(dataObj);

  api
    .post("/sales_process", processData)
    .then((result) => {
      console.log(result.data);
      clearAll();
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  saleData();
  grandTotalCalculation();
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

.table th,
.table td {
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

.customer-details,
.invoice-details {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.total-section,
.payment-section {
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
