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
  mounted() {
    window.addEventListener('load', () => {
      const url = new URL(window.location.href);
      const alertMessage = url.searchParams.get('alertMessage');
      const alertType = url.searchParams.get('alertType');

      if (alertMessage && alertType) {
        this.$refs.alert.showAlert(alertType, alertMessage, 'Success');
        url.searchParams.delete('alertMessage');
        url.searchParams.delete('alertType');
        window.history.replaceState({}, '', url);
      }
    });
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
      console.log(this.bookIdToPlaceOrder)
      this.openBookOrderConfirmDialog = true
    },
    async orderBook() {
      if(this.books.find(x=> x.id === this.bookIdToPlaceOrder).quantity > 0) {
        const inputs = {
          book_id: this.bookIdToPlaceOrder
        }

        await orderApi.orderBook(JSON.stringify(inputs)).then(async response => {
          if (response && response.status === 200) {
              // Add a query parameter to the URL with the alert message and type
              const url = new URL(window.location.href);
              url.searchParams.set('alertMessage', 'Successfully ordered the book');
              url.searchParams.set('alertType', 'success');
              window.location.href = url.toString();
            } else {
              this.$refs.alert.showAlert('error',
                response.data.detail,
                'Error placing order')
            }
          });
      }
      else {
        this.$refs.alert.showAlert('error',
            "Couldn't place an order of book because there's no more selected books",
            'Error placing order')
      }

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


