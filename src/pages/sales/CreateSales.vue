<template>
<body>

<div class="card">
  <h2>🧾 Sales Invoice</h2>

  <div class="d-flex mb-4">
    <div>
      <strong>Customer Information:</strong><br>
      Name:
      <select class="form-control">
        <option>Select Customer</option>
        <option>Customer A</option>
        <option>Customer B</option>
      </select>
      Contact: <span class="phone">017xxxxxxxx</span><br>
      Email: <span class="email">demo@mail.com</span>
    </div>

    <div class="text-end">
      <strong>Invoice Details:</strong><br>
      Invoice #: SAL-1001<br>
      Date: 11 Apr 2025
    </div>
  </div>

  <div class="text-end mt-3 clear_all">
    <button class="btn btn-danger">Clear All</button>
  </div>

  <table class="table">
    <thead>
      <tr class="first_row">
        <th>Sl</th>
        <th>Item</th>
        <th>Coupon</th>
        <th>Qty</th>
        <th>Purchase Price</th>
        <th>Selling Price</th>
        <th>Total</th>
        <th>Discount</th>
        <th>Sub-total</th>
        <th>Profit</th>
        <th>Action</th>
      </tr>
      <tr>
        <td>1</td>
        <td>
          <select class="form-control">
            <option>Select Product</option>
            <option>Product A</option>
            <option>Product B</option>
          </select>
        </td>
        <td>
          <select class="form-control">
            <option>Select Coupon</option>
            <option>Coupon A</option>
            <option>Coupon B</option>
          </select>
        </td>
        <td><input type="number" class="form-control qty"></td>
        <td><input type="text" class="form-control p_price" disabled></td>
        <td><input type="text" class="form-control s_price" ></td>
        <td><input type="text" class="form-control total" disabled></td>
        <td><input type="number" class="form-control discount" disabled></td>
        <td><input type="text" class="form-control subtotal" disabled></td>
        <td><input type="text" class="form-control profit" disabled></td>
        <td><button class="btn btn-success">Add</button></td>
      </tr>
    </thead>
    <tbody class="dataAppend">
      <!-- Dynamic rows here -->
    </tbody>
  </table>

  <div class="text-end">
    <p class="total-summary">Subtotal: <span class="subtotal">0.00</span></p>
    <p class="total-summary">Vat (10%): <span class="vat">0.00</span></p>
    <p class="total-summary">Grand Total: <span class="grand_total">0.00</span></p>
  </div>

  <div class="container">
    <p class="total-summary text-start">
      Total-Discount: <span class="Discount">0.00</span>
    </p>

    <div class="mb-3">
      <label for="payment_status_id" class="form-label">Payment Status</label>
      <select class="form-control">
        <option>Paid</option>
        <option>Unpaid</option>
        <option>Partial</option>
      </select>
    </div>
  </div>

  <div class="text-center mt-5">
    <button class="btn btn-primary btn-lg px-4 py-2 shadow">
      🧾 Process Invoice
    </button>
  </div>
</div>

</body>
</template>

<script  setup>

</script>

<style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f6f9;
      margin: 0;
      padding: 20px;
    }

    .card {
      background: white;
      max-width: 1500px;
      margin: auto;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }

    .first_row {
        background: rgb(138, 117, 218);
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    .d-flex {
      display: flex;
      justify-content: space-between;
    }

    .mb-4 {
      margin-bottom: 1.5rem;
    }

    .form-control, select, input[type="text"], input[type="number"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .text-end {
      text-align: right;
    }

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-danger {
      background-color: red;
      color: white;
    }

    .btn-success {
      background-color: green;
      color: white;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .table th, .table td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }

    .table th {
      background-color: #333;
      color: rgb(8, 0, 0);
    }

    .total-summary {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .container {
      margin-top: 30px;
    }

    .mt-5 {
      margin-top: 3rem;
    }

    .mb-3 {
      margin-bottom: 1rem;
    }

    .shadow {
      box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
    }

    .btn-lg {
      font-size: 18px;
      padding: 12px 20px;
    }

    .px-4 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .text-center {
      text-align: center;
    }

    .text-start {
      text-align: left;
    }
  </style>