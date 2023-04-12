import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import BookDetail from '@/views/Book/BookDetail.vue'
import {bookApi} from '@/services/BookApi'
import {orderApi} from '@/services/OrderApi'

export default {
  name: 'BooksView',
  components: {
    ConfirmationDialog,
    BookDetail
  },
  data() {
    return {
      books: [],
      selectedBook: null,
      searchText: "",
      bookIdToDelete: null,
      sortAscending: true,
      isViewModalVisible: false,
      isCreateModalVisible: false,
      openDeleteConfirmDialog: false,

      bookIdToPlaceOrder: null,
      openBookOrderConfirmDialog: false,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) {
        return this.books;
      }
      const searchTextLower = this.searchText.toLowerCase();
      return this.books.filter(book => {
        return (
          book.book_id.toLowerCase().includes(searchTextLower) ||
          book.title.toLowerCase().includes(searchTextLower) ||
          book.author_name.toLowerCase().includes(searchTextLower) ||
          book.quantity.toString().includes(searchTextLower)
        );
      });
    },
    isAdmin() {
      return localStorage.getItem('isAdmin') === 'true'
    }
  },
  created () {
    this.loadBooks();
  },
  methods: {
    async loadBooks () {
      const booksRsp = await bookApi.getAllBooks()
      this.books = booksRsp.data
      console.log('this.books ', this.books )
    },
    sortData() {
        let sortedDataArray = this.books.slice();
        sortedDataArray.sort((a, b) => {
          if (this.sortAscending) {
            return a.title.localeCompare(b.title);
          } else {
            return b.title.localeCompare(a.title);
          }
      });
      this.books = sortedDataArray;
      this.sortAscending = !this.sortAscending;
    },
    // Trigger opening the portfolio creation dialog
    newBook () {
      this.$nextTick(() => {
        this.$refs.BookDetail.$props.selectedBook = null;
      });
      this.isCreateModalVisible = true
    },
    openDeleteBookDialog(index){
      this.bookIdToDelete = this.books[index].id
      this.openDeleteConfirmDialog = true
    },
    async editBook(index){
      this.isCreateModalVisible = true
      this.selectedBook = this.books[index]
    },
    openOrderBookDialog(index){
      this.bookIdToPlaceOrder = this.books[index].id
      this.openBookOrderConfirmDialog = true
    },
    async orderBook(index) {
      const inputs = {
        book_id: this.books[index].id
      }
      await orderApi.orderBook(JSON.stringify(inputs)).then(async response => {
        if (response && response.status === 200) {
          this.$refs.alert.showAlert('success',
        'Successfully ordered the book',
        'Success')
        } else {
          this.$refs.alert.showAlert('error',
            response.data.detail,
            'Error placing order')
        }
      });
    },
    remove() {
    // portfolioApi.deletePortfolio(this.portfolioIdToDelete).then(response => {
    //   if(response && response.status === 200){
    //     location.reload()
    //   }
    // })
    },
  }
}
