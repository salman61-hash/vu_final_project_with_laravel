<template>
    <div class="card">

<div class="mb-3 row">
    <div class="col-6">
        <p><strong>Credit Note No:</strong> <span class="text-primary">37</span></p>
    </div>
    <div class="col-6 text-end">
        <p><strong>Date:</strong> 15 April 2025</p>
    </div>
</div>

<div class="text-center">
    <h2 class="header-text">Imran Brothers</h2>
    <p class="text-muted">Matitola, Bangladesh</p>
    <button class="debit-note-btn">Credit Note</button>
</div>

<div class="mt-4 row">
    <div class="col-6">
        <h5><strong>Customer</strong></h5>
        <select>
            <option disabled selected>Select Customer</option>
            <option>Customer A</option>
            <option>Customer B</option>
            <option>Customer C</option>
        </select>
        <p><strong>Phone:</strong> <span class="phone">019xxxxxxxx</span></p>
        <p><strong>Email:</strong> <span class="email">customer@example.com</span></p>
    </div>
    <div class="col-6 text-end">
        <p><strong>And Date:</strong> 15 May 2025</p>
    </div>
</div>

<div class="text-end mt-3">
    <button class="btn btn-danger">Clear All</button>
</div>

<table class="table">
    <thead>
        <tr class="table-success">
            <th>Sl</th>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Discount</th>
            <th>Sub Total</th>
            <th>Action</th>
        </tr>
        <tr>
            <td>1</td>
            <td>
                <select>
                    <option disabled selected>Select Product</option>
                    <option>Product A</option>
                    <option>Product B</option>
                </select>
            </td>
            <td>
                <textarea rows="3" placeholder="Enter reason for return..."></textarea>
            </td>
            <td><input type="number" placeholder="Qty"></td>
            <td><input type="text" disabled placeholder="Unit Price"></td>
            <td><input type="text" disabled placeholder="Total"></td>
            <td><input type="text" placeholder="Discount"></td>
            <td><input type="text" disabled placeholder="Sub Total"></td>
            <td><button class="btn btn-success">Add</button></td>
        </tr>
    </thead>
    <tbody>
        <!-- Data will be appended here dynamically -->
    </tbody>
    <tfoot>
        <tr>
            <th colspan="4" class="text-end">Total Amount (Taka)</th>
            <th>11,000</th>
        </tr>
    </tfoot>
</table>

<div class="text-end">
    <p><strong>💰 Subtotal:</strong> <span class="subtotal">10,000</span></p>
    <p><strong>💸 Vat (10%):</strong> <span class="vat">1,000</span></p>
    <p><strong>💯 Total Amount:</strong> <span class="grand_total">11,000</span></p>
</div>

<div class="container">
    <p class="total-summary">Total-Discount: <span class="Discount">500</span></p>
</div>

<div class="text-center mt-5">
    <button class="btn btn-primary btn-lg px-4 py-2 shadow">
        🧾 Process Invoice
    </button>
</div>

</div>
  </template>
  
  <script lang="ts" setup>
  
  </script>
  
  <style>
  body {
      font-family: Arial, sans-serif;
      background: #f7f7f7;
      margin: 0;
      padding: 20px;
  }
  .card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
      padding: 20px;
      max-width: 1000px;
      margin: auto;
  }
  .text-center { text-align: center; }
  .text-end { text-align: right; }
  .text-muted { color: gray; }
  .text-primary { color: #007bff; }
  .header-text { margin: 0; font-size: 28px; }
  .debit-note-btn {
      background-color: #0d6efd;
      border: none;
      color: white;
      padding: 8px 20px;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
  }
  select, input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 5px 0;
      box-sizing: border-box;
  }
  textarea { resize: vertical; }
  .btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
  }
  .btn-danger { background: #dc3545; color: white; }
  .btn-success { background: #28a745; color: white; }
  .btn-primary { background: #007bff; color: white; }
  .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
  }
  .table th, .table td {
      border: 1px solid #dee2e6;
      padding: 8px;
      text-align: center;
  }
  .table-success {
      background-color: #d4edda;
  }
  .mt-4 { margin-top: 1.5rem; }
  .mt-3 { margin-top: 1rem; }
  .mt-5 { margin-top: 3rem; }
  .mb-3 { margin-bottom: 1rem; }
  .row {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
  }
  .col-6 {
      width: 100%;
      padding: 10px;
  }
  @media (min-width: 768px) {
      .col-6 { width: 50%; }
  }
  .shadow {
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  .px-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .total-summary {
      font-weight: bold;
  }
</style>