<!--
  FILE			    : OrdersView.vue
  PROJECT		    : SENG3080 - AWF :: Group Project
  LAST VERSION  : 2023-04-13
  DESCRIPTION	  : This is a Order page which shows list of Orders in database
-->
<template>
<div>
  <vue-basic-alert
     :duration="300"
     :closeIn="2500"
     ref="alert" />
   <ConfirmationDialog
    style="align-content: center"
    v-if="openReturnConfirmDialog"
    title="Confirmation"
    message="Are you sure about returning this book?"
    confirm-btn-label="Yes"
    :on-confirm="updateReturnStatus"
    @close-modal="openReturnConfirmDialog = false;"
  />
  <h1 class="view-title">Orders</h1>
  <div class="py-4 container-fluid">
    <div class="card scrollable">
      <div class="card-body">
        <!-- Search form -->
        <div style="display:inline-block; float:right;" class="d-none d-md-flex input-group w-auto my-auto navbar-nav ms-auto d-flex flex-row">
          <input
            v-model="searchText"
            autocomplete="off"
            type="search"
            class="form-control rounded"
            placeholder='Search'
            style="min-width: 225px"
          />
          <span class="input-group-text border-0">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <div id="table" class="table-editable">
          <table class="table table-responsive-md table-striped text-center">
            <thead>
              <tr>
                <th class="text-center">Order Id</th>
                <th class="text-center" v-if="isAdmin">Member's Name</th>
                <th class="text-center">Book Title
                  <a href="#" @click="sortData" title="Sort resources">
                    <i class="fas fa-sort" aria-hidden="true"></i>
                  </a>
                </th>
                <th class="text-center">Author</th>
                <th class="text-center">Checkout Date</th>
                <th class="text-center">Final Return Date</th>
                <th class="text-center">Returned Date</th>
                <th class="text-center" v-if="isAdmin">Return Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in filteredOrders" :key="index">
                <td class="pt-3-half" contenteditable="false">{{ order.id }}</td>
                <td class="pt-3-half" v-if="isAdmin" contenteditable="false">{{ order.user.first_name }} {{ order.user.last_name }}</td>
                <td class="pt-3-half" contenteditable="false">{{ order.book.title }}</td>
                <td class="pt-3-half" contenteditable="false">{{ order.book.author_name }}</td>
                <td class="pt-3-half" contenteditable="false">{{ order.checkout_date }}</td>
                <td class="pt-3-half" contenteditable="false">{{ order.final_return_date }}</td>
                <td class="pt-3-half" contenteditable="false">{{ order.returned_date }}</td>
                <td v-if="isAdmin">
                  <span v-if="this.orders[index].returned_date === null">
                    <span @click="updateReturnStatus()"></span>
                    <span @click="openReturnDialog(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        Returned
                      </button>
                    </span>
                  </span>
                  <span v-else>
                    <button type="button" class="btn btn-green btn-rounded btn-sm my-0" disabled>
                      Returned
                    </button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script src="../modules/orders.js">
</script>

<style scoped src="../assets/css/table.css">
</style>

