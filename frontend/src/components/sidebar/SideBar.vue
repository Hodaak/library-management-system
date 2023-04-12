<template>
   <!--Main Navigation-->
  <header>
    <!-- Sidebar -->
    <nav id="sidebarMenu"
         class="collapse d-lg-block sidebar collapse bg-white">
      <div class="position-sticky">
        <div class="list-group list-group-flush mx-3 mt-4">
          <a ref="books"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === booksPath ||
              $route.path === booksPath ? 'active' : ''}`"
            >
            <SidebarLink to="/books" icon="fas fa-home">Books</SidebarLink>
          </a>
          <a ref="orders"
             :class="`menuItem list-group-item list-group-item-action py-2 ripple
             ${$route.path === ordersPath ? 'active' : ''}`"
             >
            <SidebarLink to="/orders" icon="fas fa-th-list">Orders</SidebarLink>
          </a>
        </div>
      </div>
    </nav>
    <!-- Sidebar -->

    <!-- Navbar -->
    <nav id="main-navbar"
         class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
         >
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
                class="navbar-toggler"
                type="button"
                v-on:click="toggleButtonClicked"
                >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Brand -->
        <a class="navbar-brand" href="#">
          <h2>Library Management System</h2>
        </a>

        <!-- Right links -->
        <ul class="navbar-nav ms-auto d-flex flex-row">
          <!-- User -->
          <li class="nav-item dropdown">
             <a
                class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                @click="toggleUserDropdown"
                aria-expanded="false"
              >
                <label class="rounded-circle" loading="lazy">{{ userName }}</label>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                v-if="showUserDropdown"
                v-bind:class="{ show: showUserDropdown }"
              >
                <li><a class="dropdown-item" @click="logout">Logout</a></li>
              </ul>
          </li>
        </ul>
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </header>
  <!--Main Navigation-->

  <!--Main layout-->
  <main style="margin-top: 58px">
    <div class="container pt-4">
      <router-view/>
    </div>
  </main>
  <!--Main layout-->
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import store from '@/store'

export default {
  data() {
    return {
      showUserDropdown: false,
      booksPath: this.$router.options.routes.find(route => route.name === 'Books').path,
      ordersPath: this.$router.options.routes.find(route => route.name === 'Orders').path,
    };
  },
  components: { SidebarLink },
  methods: {
    toggleButtonClicked () {
      if (document.getElementById("sidebarMenu").style.display === "block") {
        document.getElementById("sidebarMenu").style.display = "none"
      } else {
        document.getElementById("sidebarMenu").style.display = "block"
      }
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
    async logout () {
      await store.dispatch('logout', `${localStorage.getItem('token')}`, store.getters.getUser )
    }
  },
  computed: {
    userName () {
      return localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : "";
    }
  }
}
</script>

<style scoped>
  body {
    background-color: #fbfbfb;
  }

  @media (max-width: 991.98px) {
    .sidebar {
      width: 100%;
    }
  }

  @media only screen and (min-width: 991.98px) {
     main {
      padding-top: 10px;
      padding-left: 260px;
    }
  }

  /* Sidebar */
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 58px 0 0; /* Height of navbar */
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
    width: 240px;
    z-index: 600;
  }

  .sidebar .active {
    border-radius: 5px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  .menuItem{
    width: 100%
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    display: none;
    float: right;
    min-width: 10rem;
    padding: .5rem 0;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: .25rem;
  }
  .dropdown-menu.show {
    display: block;
  }
  .dropdown-menu-end {
    right: 0;
    left: auto;
  }
</style>
