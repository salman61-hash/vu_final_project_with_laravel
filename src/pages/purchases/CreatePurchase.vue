<template>
 

<head>
  <meta charset="UTF-8">
  <title>Purchase Bill</title>
  
</head>
<body>

<div class="card">
  <h2>💳 Purchase Bill</h2>

  <div class="section">
    <div>
      <h4>📦 Supplier Information</h4>
      <label for="supplier_id">Supplier</label>
      <select id="supplier_id">
        <option value="">Select Supplier</option>
        <option value="1">Supplier A</option>
        <option value="2">Supplier B</option>
      </select>

      <p><strong>Address:</strong> <span class="address">123 Street</span></p>
      <p><strong>Phone:</strong> <span class="phone">0123456789</span></p>
    </div>

    <div class="text-end">
      <h4>🧾 Invoice Details</h4>
      <p>Purchase ID: <strong>INV-001</strong></p>
      <p>Date: 11 Apr 2025</p>
      <p>Due Date: 28 Feb 2025</p>
    </div>
  </div>

  <div class="text-end">
    <button class="btn btn-danger">Clear All</button>
  </div>

  <table>
    <thead>
    <tr>
      <th>Sl</th>
      <th>Item</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total</th>
      <th>Discount</th>
      <th>Sub Total</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>1</td>
      <td>
        <select>
          <option value="">Select Product</option>
          <option value="1">Product A</option>
          <option value="2">Product B</option>
        </select>
      </td>
      <td><input type="number" class="qty"></td>
      <td><input type="text" class="P_price" disabled></td>
      <td><input type="text" class="total" disabled></td>
      <td><input type="text" class="discount"></td>
      <td><input type="text" class="subtotal" disabled></td>
      <td><button class="btn btn-success">Add</button></td>
    </tr>
    </tbody>
  </table>

  <div class="summary text-end">
    <p><strong>💰 Subtotal:</strong> <span class="subtotal">00</span></p>
    <p><strong>💸 Vat (10%):</strong> <span class="vat">00</span></p>
    <p><strong>💯 Total Amount:</strong> <span class="grand_total">00</span></p>
  </div>

  <div class="summary text-start">
    <p><strong>Total Discount:</strong> <span class="Discount">00</span></p>
  </div>

  <div class="mb-3">
    <label for="payment_status">Payment Status</label>
    <select id="payment_status">
      <option value="1">Paid</option>
      <option value="2">Unpaid</option>
      <option value="3">Partial</option>
    </select>
  </div>

  <div class="footer-button">
    <button class="btn btn-primary btn-lg">🧾 Process Invoice</button>
  </div>
</div>

</body>



</template>

<script lang="ts" setup>

</script>

<style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f7f9fc;
      margin: 0;
      padding: 20px;
    }

    .card {
      background-color: white;
      padding: 50px;
      max-width: 1300px;
      margin: auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      border-radius: 10px;
    }

    h2 {
      text-align: center;
      margin-bottom: 30px;
    }

    .section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }

    .section div {
      width: 48%;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
    }

    select, input[type="text"], input[type="number"] {
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #007bff;
      color: white;
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .btn-success {
      background-color: green;
      color: white;
    }

    .btn-danger {
      background-color: red;
      color: white;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .text-end {
      text-align: right;
    }

    .summary {
      margin-top: 30px;
      font-size: 16px;
    }

    .footer-button {
      text-align: center;
      margin-top: 30px;
    }
  </style>