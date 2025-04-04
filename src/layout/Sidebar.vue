<template>
  <div class="leftside-menu">
    <!-- Brand Logo Light -->
    <a href="index.html" class="logo logo-light">
      <span class="logo-lg">
        <img src="/assets/images/logo.png" alt="logo" />
      </span>
      <span class="logo-sm">
        <img src="/assets/images/logo-sm.png" alt="small logo" />
      </span>
    </a>

    <!-- Brand Logo Dark -->
    <a href="index.html" class="logo logo-dark">
      <span class="logo-lg">
        <img src="/assets/images/logo-dark.png" alt="dark logo" />
      </span>
      <span class="logo-sm">
        <img src="/assets/images/logo-sm.png" alt="small logo" />
      </span>
    </a>

    <!-- Sidebar -left -->
    <div class="h-100" id="leftside-menu-container" data-simplebar>
      <!--- Sidemenu -->
      <ul class="side-nav">
        <li class="side-nav-title">Main</li>

        <li class="side-nav-item">
          <RouterLink to="/" class="side-nav-link">
            <i class="ri-dashboard-line"></i>
            <span> Dashboard </span>
          </RouterLink>
        </li>

        <!-- User Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarUser"
            aria-expanded="false"
            aria-controls="sidebarUser"
            class="side-nav-link"
          >
            <i class="ri-user-line"></i>
            <span> Users </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarUser">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="users">View User List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Customer Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarCustomer"
            aria-expanded="false"
            aria-controls="sidebarCustomer"
            class="side-nav-link"
          >
            <i class="ri-user-fill"></i>
            <span> Customers </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarCustomer">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="customers">View Customer List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Supplier Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarSupplier"
            aria-expanded="false"
            aria-controls="sidebarSupplier"
            class="side-nav-link"
          >
            <i class="ri-truck-line"></i>
            <span> Suppliers </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarSupplier">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="suppliers">View Suppliers List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Self/category -->
        <li class="side-nav-item">
  <a
    data-bs-toggle="collapse"
    href="#sidebarself"
    aria-expanded="false"
    aria-controls="sidebarself"
    class="side-nav-link"
  >
    <i class="ri-user-line"></i>  <!-- Changed icon -->
    <span> Self </span>
    <span class="menu-arrow"></span>
  </a>
  <div class="collapse" id="sidebarself">
    <ul class="side-nav-second-level">
      <li>
        <RouterLink to="self">View Self List</RouterLink>
      </li>
    </ul>
  </div>
</li>


        <!-- Payment Status Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarPaymentStatus"
            aria-expanded="false"
            aria-controls="sidebarPaymentStatus"
            class="side-nav-link"
          >
            <i class="ri-wallet-line"></i>
            <span> Payment Status </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarPaymentStatus">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="payment-status"
                  >View Payment Status List</RouterLink
                >
              </li>
            </ul>
          </div>
        </li>

        <!-- Products Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarProducts"
            aria-expanded="false"
            aria-controls="sidebarProducts"
            class="side-nav-link"
          >
            <i class="ri-customer-service-line"></i>
            <span> Products </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarProducts">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="products">View Products List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Purchase Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarPurchase"
            aria-expanded="false"
            aria-controls="sidebarPurchase"
            class="side-nav-link"
          >
            <i class="ri-shopping-cart-line"></i>
            <span> Purchase </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarPurchase">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="purchase">View Purchase List</RouterLink>
              </li>
              <li>
                <RouterLink to="purchase-details"
                  >View Purchase Details</RouterLink
                >
              </li>
              <li>
                <RouterLink to="purchase-return"
                  >View Purchase Return List</RouterLink
                >
              </li>
            </ul>
          </div>
        </li>

        <!-- Sales Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarSales"
            aria-expanded="false"
            aria-controls="sidebarSales"
            class="side-nav-link"
          >
            <i class="ri-shopping-cart-line"></i>
            <!-- Correct Sales Icon -->
            <span> Sales </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarSales">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="sales">View Sales List</RouterLink>
              </li>
              <li>
                <RouterLink to="sales-details">View Sales Details</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Expense Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarExpense"
            aria-expanded="false"
            aria-controls="sidebarExpense"
            class="side-nav-link"
          >
            <i class="ri-money-dollar-circle-line"></i>
            <span> Expense </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarExpense">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="expenses">View Expense List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Stock Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarStock"
            aria-expanded="false"
            aria-controls="sidebarStock"
            class="side-nav-link"
          >
            <i class="ri-stack-line"></i>
            <span> Stocks </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarStock">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="stocks">View Stocks List</RouterLink>
              </li>
            </ul>
          </div>
        </li>

        <!-- Withdraw Section -->
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarWithdraw"
            aria-expanded="false"
            aria-controls="sidebarWithdraw"
            class="side-nav-link"
          >
            <i class="ri-exchange-dollar-line"></i>
            <span> Withdraw </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarWithdraw">
            <ul class="side-nav-second-level">
              <li>
                <RouterLink to="withdraw">View Withdraw List</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!--- End Sidemenu -->

      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
