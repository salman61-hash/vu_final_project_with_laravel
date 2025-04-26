<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow-sm border-0">
        <div class="card-body p-12">
          <div class="invoice-wrap">
            <!-- Purchase Bill Title & Invoice Details -->
            <div class="d-flex justify-content-between align-items-center my-4">
              <div><h1>Purchase Bill</h1></div>
              <div class="text-end">
                <strong>Invoice Details:</strong><br />
                Invoice #: {{ invoiceNumber }}<br />
                Date: {{ invoiceDate }}<br />
              </div>
            </div>

            <div class="row">
              <!-- Purchase From Company Address -->
              <div class="col-md-8">
                <div class="invoice-address mb-4">
                  <h6 class="fw-bold mb-2 text-primary">Purchase From:</h6>
                  <ul class="list-unstyled">
                    <li>XYZ Shop</li>
                    <li>Dhaka, Bangladesh</li>
                    <li>Phone: 01793 956 777</li>
                    <li>Email: mdaslamcric@gmail.com</li>
                  </ul>
                </div>
              </div>

              <!-- Supplier Selection -->
              <div class="col-md-4">
                <div class="invoice-address text-start mb-4">
                  <h6 class="fw-bold mb-2 text-primary">Supplier:</h6>
                  <select
                    v-model="dataObj.selectedsupplier"
                    class="form-control mb-2"
                  >
                    <option disabled value="">Select Supplier</option>
                    <option v-for="s in suppliers" :key="s.id" :value="s">
                      {{ s.name }}
                    </option>
                  </select>

                  <p>
                    Address:
                    <span>{{ dataObj.selectedsupplier.address || "N/A" }}</span>
                  </p>
                  <p>
                    Email:
                    <span>{{ dataObj.selectedsupplier.email || "N/A" }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button @click="clearCart" class="btn btn-danger">
                Clear All
              </button>
            </div>

            <!-- Product Table -->
            <div class="table-responsive mt-2">
              <table class="table table-bordered">
                <thead class="table-light text-white bg-primary">
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Purchase Price</th>
                    <th>Qty</th>
                    <th>Discount</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>
                      <select
                        v-model="dataObj.selectedProduct"
                        class="form-control"
                      >
                        <option value="">Select Product</option>
                        <option v-for="p in products" :key="p.id" :value="p">
                          {{ p.name }}
                        </option>
                      </select>
                    </th>
                    <th>
                      <input
                        type="text"
                        class="form-control"
                        v-model="dataObj.selectedProduct.purchase_price"
                        disabled
                      />
                    </th>
                    <th>
                      <input
                        type="number"
                        class="form-control"
                        v-model="dataObj.qty"
                        min="1"
                      />
                    </th>
                    <th>
                      <input
                        type="number"
                        class="form-control"
                        v-model="dataObj.discount"
                      />
                    </th>
                    <th>
                      <input
                        type="text"
                        class="form-control"
                        :value="calculatedSubtotal"
                        disabled
                      />
                    </th>
                    <th>
                      <button @click="addToCart" class="btn btn-success">
                        Add
                      </button>
                    </th>
                  </tr>
                </thead>

                <!-- Purchase Items -->
                <tbody>
                  <tr v-for="(item, i) in cartItems" :key="item.item_id">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.discount }}</td>
                    <td>{{ item.subtotal }}</td>
                    <td>
                      <button
                        @click="itemRemove(item.item_id)"
                        class="btn btn-warning"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>

                <!-- Totals -->
                <tfoot>
                  <tr>
                    <td colspan="5" class="text-end">Sub Total</td>
                    <td>{{ dataObj.subTotal.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-end">Vat (5%)</td>
                    <td>{{ dataObj.vat.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-end">Discount</td>
                    <td>{{ dataObj.totalDiscount.toFixed(2) }}</td>
                  </tr>
                  <tr>
                    <td colspan="5" class="text-end fw-bold">Grand Total</td>
                    <td class="fw-bold">{{ dataObj.grandTotal.toFixed(2) }}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- Payment Status Select -->
              <select v-model="dataObj.selectedStatus">
                <option disabled :value="null">Select Status</option>
                <option v-for="p in payment_status" :key="p.id" :value="p">
                  {{ p.name }}
                </option>
              </select>
            </div>

            <!-- Process Purchase Button -->
            <div class="d-flex justify-content-end mt-4">
              <button @click="process" class="btn btn-success">
                Save Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/Api";
import { computed, onMounted, reactive, ref } from "vue";
import { useCart } from "../cart/Cart";

const suppliers = ref([]);
const products = ref([]);
const payment_status = ref([]);

const cart = useCart("Purchase");
const cartItems = ref(cart.getCart());

const invoiceNumber = ref("");
const invoiceDate = ref("");

const generateInvoice = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  invoiceNumber.value = `PUR-${datePart}-${randomPart}`;

  const today = new Date();
  const options = { day: "2-digit", month: "short", year: "numeric" };
  invoiceDate.value = today.toLocaleDateString("en-US", options);
};

const dataObj = reactive({
  selectedsupplier: {},
  selectedProduct: {},
  selectedStatus: {},
  qty: 1,
  discount: 0,
  totalDiscount: 0,
  subTotal: 0,
  vat: 0,
  grandTotal: 0,
});

const calculatedSubtotal = computed(() => {
  if (dataObj.selectedProduct && dataObj.selectedProduct.purchase_price) {
    let price = dataObj.selectedProduct.purchase_price;
    let qty = dataObj.qty || 1;
    let discount = dataObj.discount || 0;
    return price * qty - discount;
  }
  return 0;
});

const grandTotalCalculation = () => {
  const subtotal = cartItems.value.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );
  const vat = (subtotal * 5) / 100;
  const totalDiscount = cartItems.value.reduce(
    (acc, item) => acc + item.discount,
    0
  );
  const grandTotal = subtotal + vat - totalDiscount;

  dataObj.subTotal = subtotal;
  dataObj.vat = vat;
  dataObj.totalDiscount = totalDiscount;
  dataObj.grandTotal = grandTotal;
};

const PurchaseData = () => {
  api
    .get("/purchase")
    .then((result) => {
      suppliers.value = result.data.suppliers;
      products.value = result.data.products;
      payment_status.value = result.data.payment_status;
    })
    .catch((err) => console.log(err));
};

const addToCart = () => {
  if (!dataObj.selectedProduct.id) return;

  let discount = dataObj.discount * dataObj.qty;
  let subtotal =
    dataObj.selectedProduct.purchase_price * dataObj.qty - discount;

  const item = {
    item_id: dataObj.selectedProduct.id,
    name: dataObj.selectedProduct.name,
    price: dataObj.selectedProduct.purchase_price,
    discount: discount,
    qty: dataObj.qty,
    subtotal: subtotal,
  };

  cart.save(item);
  cartItems.value = cart.getCart();
  grandTotalCalculation();

  dataObj.selectedProduct = {};
  dataObj.qty = 1;
  dataObj.discount = 0;
};

const itemRemove = (id) => {
  cart.deleteItem(id);
  cartItems.value = cart.getCart();
  grandTotalCalculation();
};

const clearCart = () => {
  cart.clearCart();
  cartItems.value = [];
  grandTotalCalculation();
};

const processPurchase = () => {
  alert("Purchase saved successfully!");
};

onMounted(() => {
  PurchaseData();
  generateInvoice();
});

const process = () => {
  const processData = {
    products: cart.getCart(),
    supplier: dataObj.selectedsupplier,
    discount: dataObj.totalDiscount,
    payment_status: dataObj.selectedStatus,
    vat: dataObj.vat,
    grandtotal: dataObj.grandTotal,
  };

  api.post("/purchase_process", processData)
    .then(result => {
      console.log(result.data);
      clearCart(); 
    })
    .catch(err => {
      console.log(err);
    });
}
</script>

<style scoped>
/* Your style here */
</style>
