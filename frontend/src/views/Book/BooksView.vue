<template>
  <ConfirmationDialog
    style="align-content: center"
    v-if="openDeleteConfirmDialog"
    title="Confirmation"
    message="Do you want to delete the book?"
    confirm-btn-label="Yes"
    :on-confirm="remove"
    @close-modal="openDeleteConfirmDialog = false; bookIdToDelete = null"
  />
  <h1 class="view-title">Books</h1>
  <div v-if="isAdmin">
    <div class="py-4 container-fluid">
      <div class="card scrollable">
        <div class="card-body">
          <span>
            <a href="#!" @click="newBook" title="Add new book">
              <i class="fas fa-plus fa-2x sign-blue icon" aria-hidden="true"></i>
            </a>
          </span>
          <BookDetail ref="BookDetail"
            style="align-content: center"
            v-if="isCreateModalVisible"
            @close-modal="isCreateModalVisible = false"
          />
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
                  <th class="text-center">View</th>
                  <th class="text-center">Edit</th>
                  <th class="text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, index) in books" :key="book.id">
                  <td class="pt-3-half" contenteditable="false">{{ book.title }}</td>
                  <td>
                    <span class="table-view" @click="viewBook(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        View
                      </button>
                    </span>
                  </td>
                  <td>
                    <span class="table-download" @click="editBook(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        Edit
                      </button>
                    </span>
                  </td>
                  <td>
                    <span class="table-remove" @click="openDeletePortfolioDialog(index)">
                      <button type="button" class="btn btn-danger btn-rounded btn-sm my-0">
                        Remove
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
  <div v-else>
    <div class="py-4 container-fluid">
      <div class="card scrollable">
        <div class="card-body">
          <AddBookModal
            style="align-content: center"
            v-if="isCreateModalVisible"
            @close-modal="isCreateModalVisible = false"
          />
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
                  <th class="text-center">Place Order</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book, index) in books" :key="book.id">
                  <td class="pt-3-half" contenteditable="false">{{ book.title }}</td>
                  <td>
                    <span class="table-view" @click="orderBook(index)">
                      <button type="button" class="btn btn-green btn-rounded btn-sm my-0">
                        Place Order
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

<script src="../../modules/Book/book.js">
</script>

<style scoped>

</style>
