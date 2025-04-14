<template>
  <div>
    <div class="card">
    <div class="invoice-box">

        <div class="info-row">
            <p><strong>Debit Note No:</strong> <span style="color:blue;">37</span></p>
            <p><strong>Date:</strong> 14 April 2025</p>
        </div>

        <h2 class="header-text">Imran Brothers</h2>
        <p class="text-muted">Matitola, Bangladesh</p>
        <button class="debit-note-btn">Debit Note</button>

        <div class="info-row" style="margin-top: 20px;">
            <div style="width: 48%;">
                <h5><strong>Supplier</strong></h5>
                <select>
                    <option>Select Supplier</option>
                    <option>Supplier 1</option>
                    <option>Supplier 2</option>
                    <option>Supplier 3</option>
                </select>
                <p><strong>Address:</strong> <span class="address">N/A</span></p>
                <p><strong>Phone:</strong> <span class="phone">N/A</span></p>
            </div>
            <div style="width: 48%; text-align:right;">
                <p><strong>And Date:</strong> 14 May 2025</p>
            </div>
        </div>

        <div class="text-end" style="margin-bottom: 15px;">
            <button class="btn btn-danger">Clear All</button>
        </div>

        <table class="table">
            <thead>
            <tr>
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
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>
                    <select>
                        <option>Select Product</option>
                        <option>Product A</option>
                        <option>Product B</option>
                    </select>
                </td>
                <td><textarea placeholder="Enter reason for return..."></textarea></td>
                <td><input type="number" placeholder="Qty"></td>
                <td><input type="text" placeholder="Unit Price" disabled></td>
                <td><input type="text" placeholder="Total" disabled></td>
                <td><input type="text" placeholder="Discount"></td>
                <td><input type="text" placeholder="Sub Total" disabled></td>
                <td><button class="btn btn-success">Add</button></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th colspan="4" style="text-align:right;">Total Amount (Taka)</th>
                <th>11,000</th>
                <th colspan="4"></th>
            </tr>
            </tfoot>
        </table>

        <div class="summary">
            <p>💰 Subtotal: 10,000</p>
            <p>💸 Vat (10%): 1,000</p>
            <p>💯 Total Amount: 11,000</p>
            <p>Total-Discount: 0</p>
        </div>

        <button class="process-btn">🧾 Process Invoice</button>

    </div>
</div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f4f6f8;
    margin: 0;
    padding: 20px;
}
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
    padding: 25px;
    max-width: 1100px;
    margin: auto;
}
.invoice-box {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}
.header-text {
    font-size: 28px;
    color: #333;
    margin-bottom: 5px;
    font-weight: 600;
    text-align: center;
}
.text-muted {
    color: #6c757d;
    text-align: center;
}
.debit-note-btn {
    display: block;
    margin: 10px auto;
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;
}
.debit-note-btn:hover {
    background: #0056b3;
}
.info-row, .product-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.info-row p {
    margin: 0;
}
select, input, textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 6px;
}
.table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
.table th, .table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}
.table thead tr {
    background: #d1e7dd;
    color: #1e3d32;
}
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
.btn-success {
    background: #198754;
    color: white;
}
.btn-success:hover {
    background: #146c43;
}
.btn-danger {
    background: #dc3545;
    color: white;
}
.btn-danger:hover {
    background: #bb2d3b;
}
.summary {
    text-align: right;
    margin-top: 20px;
}
.summary p {
    margin: 5px 0;
    font-weight: bold;
}
.process-btn {
    display: block;
    width: fit-content;
    margin: 40px auto 0;
    background: #007bff;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    transition: background 0.3s ease;
}
.process-btn:hover {
    background: #0056b3;
}
</style>