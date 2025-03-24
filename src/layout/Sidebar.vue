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
          <a href="/" class="side-nav-link">
            <i class="ri-dashboard-3-line"></i>
            <span class="badge bg-success float-end">9+</span>
            <span> Dashboard </span>
          </a>
        </li>

        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebarPages"
            aria-expanded="false"
            aria-controls="sidebarPages"
            class="side-nav-link"
          >
            <i class="ri-pages-line"></i>
            <span> Pages </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebarPages">
            <ul class="side-nav-second-level">
              <li>
                <a href="pages-starter.html">Starter Page</a>
              </li>
             
            </ul>
          </div>
        </li>
        <li class="side-nav-item">
          <a
            data-bs-toggle="collapse"
            href="#sidebaruser"
            aria-expanded="false"
            aria-controls="sidebaruser"
            class="side-nav-link"
          >
            <i class="ri-pages-line"></i>
            <span> User </span>
            <span class="menu-arrow"></span>
          </a>
          <div class="collapse" id="sidebaruser">
            <ul class="side-nav-second-level">
              <li>
                <a href="pages-starter.html">Starter Page</a>
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
