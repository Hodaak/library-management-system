<template>
  <vue-basic-alert
     :duration="300"
     :closeIn="2500"
     ref="alert" />
  <ConfirmationDialog
    style="align-content: center"
    v-if="openDeleteConfirmDialog"
    title="Confirmation"
    message="Do you want to delete the book?"
    confirm-btn-label="Yes"
    :on-confirm="remove"
    @close-modal="openDeleteConfirmDialog = false; bookIdToDelete = null"
  />
  <ConfirmationDialog
    style="align-content: center"
    v-if="openBookOrderConfirmDialog"
    title="Confirmation"
    message="Do you want to order this book?"
    confirm-btn-label="Yes"
    :on-confirm="orderBook"
    @close-modal="openBookOrderConfirmDialog = false; bookIdToPlaceOrder = null"
  />
  <h1 class="view-title">Books</h1>
    <div class="py-4 container-fluid">
      <div class="card scrollable">
        <div class="card-body">
          <span v-if="isAdmin" style="float:left;">
            <a href="#!" @click="newBook" title="Add new book">
              <i class="fas fa-plus fa-2x sign-blue icon" aria-hidden="true"></i>
            </a>
          </span>
          <!-- Search form -->
          <div style="display:inline-block; float:right;"
                class="d-none d-md-flex input-group w-auto my-auto navbar-nav ms-auto d-flex flex-row">
            <input
                  v-model="searchText"
                   autocomplete="off"
                   type="search"
                   class="form-control rounded"
                   placeholder='Search'
                   style="min-width: 225px"
                   />
            <span class="input-group-text border-0"
                  ><i class="fas fa-search"></i
              ></span>
          </div>
          <BookDetail ref="BookDetail"
            :bookToUpdate = "selectedBook ? selectedBook : null"
            style="align-content: center"
            v-if="isCreateModalVisible"
            @close-modal="isCreateModalVisible = false, selectedBook = null"
          />
          <br><br>
          <div id="table" class="table-editable">
            <table class="table table-responsive-md table-striped text-center">
              <thead>
                <tr>
                  <th class="text-center">Book Id</th>
                  <th class="text-center">Title
                    <a href="#" @click="sortData" title="Sort portfolios">
                      <i class="fas fa-sort" aria-hidden="true"></i>
                    </a>
                  </th>
                  <th class="text-center">Author</th>
                  <th class="text-center">Quantity</th>
                  <th v-if="isAdmin" class="text-center">Edit</th>
                  <th v-if="isAdmin" class="text-center">Remove</th>
                  <th v-else class="text-center">Place Order</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, index) in filteredBooks" :key="book.id">
                  <td class="pt-3-half" contenteditable="false">{{ book.book_id }}</td>
                  <td class="pt-3-half" contenteditable="false">{{ book.title }}</td>
                  <td class="pt-3-half" contenteditable="false">{{ book.author_name }}</td>
                  <td class="pt-3-half" contenteditable="false">{{ book.quantity }}</td>
                  <td v-if="isAdmin">
                    <span class="table-download" @click="editBook(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        Edit
                      </button>
                    </span>
                  </td>
                  <td v-if="isAdmin">
                    <span class="table-remove" @click="openDeleteBookDialog(index)">
                      <button type="button" class="btn btn-danger btn-rounded btn-sm my-0">
                        Remove
                      </button>
                    </span>
                  </td>
                  <td v-else>
                    <span class="table-view" @click="openOrderBookDialog(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        Place an order
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
</template>

<script src="../../modules/Book/book.js">
</script>

<style scoped src="@/assets/css/table.css">
</style>
