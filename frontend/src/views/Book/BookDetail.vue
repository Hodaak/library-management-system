<!--
  FILE			    : BookDetail.vue
  PROJECT		    : SENG3080 - AWF :: Group Project
  LAST VERSION  : 2023-04-13
  DESCRIPTION	  : This is a detail view of Book page which user can add new book or modify existing book
-->

<template>
  <vue-basic-alert
     :duration="300"
     :closeIn="2500"
     ref="alert" />
  <div class="modal">
    <div class="overlay" @click="$emit('close-modal'), bookToUpdate = null, tempSelectedBook=null"></div>
    <div class="modal-card">
      <div v-if="tempSelectedBook == null">
        <h3>Add New Book</h3>
        <br>
        <span style="color:darkred;font-size:4mm" v-if="bookMsg.failed">{{`* ${bookMsg.failed}`}}</span>
        <a href="#!" @click="$emit('close-modal')" title="close">
          <i class="fas fa-times close-icon" aria-hidden="true"></i>
        </a>
        <form class="form-group" @submit.prevent="createNewBook">
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="form-group row">
                <label for="book-id" class="col-sm-3 col-form-label">Book Id:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="book-id" v-model="newBookId" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="book-title" class="col-sm-3 col-form-label">Title:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="book-title" v-model="newBookTitle" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="book-author" class="col-sm-3 col-form-label">Author:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="book-author" v-model="newBookAuthor" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="book-quantity" class="col-sm-3 col-form-label">Quantity:</label>
                <div class="col-sm-9">
                  <input type="number" min="1" step="1"
                         oninput="validity.valid||(value='');"
                         class="form-control" id="book-quantity" v-model="newBookQuantity" required>
                </div>
              </div>
              <br/>
            </div>
          </div>
          <hr>
          <input id="register-button" type="submit" value="Create" class="btn btn-primary">
        </form>
      </div>
      <div v-else>
        <h3>Update Book</h3>
        <br>
        <span style="color:darkred;font-size:4mm" v-if="bookMsg.failed">{{`* ${bookMsg.failed}`}}</span>
        <a href="#!" @click="$emit('close-modal')" title="close">
          <i class="fas fa-times close-icon" aria-hidden="true"></i>
        </a>
        <form class="form-group" @submit.prevent="updateBook">
          <div class="row">
            <div class="col-md-8 mb-3">
              <div class="form-group row">
                <label for="selected-book-id" class="col-sm-3 col-form-label">Book Id:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="selected-book-id" v-model="tempSelectedBook.book_id" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="selected-book-title" class="col-sm-3 col-form-label">Title:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="selected-book-title" v-model="tempSelectedBook.title" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="selected-book-author" class="col-sm-3 col-form-label">Author:</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="selected-book-author" v-model="tempSelectedBook.author_name" required>
                </div>
              </div>
              <div class="form-group row">
                <label for="selected-book-quantity" class="col-sm-3 col-form-label">Quantity:</label>
                <div class="col-sm-9">
                  <input type="number" min="1" class="form-control" id="selected-book-quantity" v-model="tempSelectedBook.quantity" required>
                </div>
              </div>
              <br/>
            </div>
          </div>
          <hr>
          <input id="register-button" type="submit" value="Save" class="btn btn-primary">
        </form>
      </div>
    </div>
  </div>
</template>

<script src="../../modules/Book/bookDetail.js"/>

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center; /* horizontally center the modal */
  align-items: center; /* vertically center the modal */
  background-color: rgba(0, 0, 0, 0.5);
}
.overlay {
  opacity: 0.5;
  background-color: black;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.modal-card {
  position: relative;
  width: 850px; /* fixed value */
  margin: 30px auto auto;
  top: 15%;
  padding: 20px;
  background-color: white;
  height: auto; /* updated property */
  z-index: 10;
  opacity: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.close-icon:hover {background-color: rgb(238, 102, 102); color: white;}
.close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  margin-left: 100%;
  margin-bottom: 100%;
  color: rgb(72, 70, 70);
  padding-left: 5px;
  padding-right: 5px;
  font-size: 1.8em;
}
</style>
