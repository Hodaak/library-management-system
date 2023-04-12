import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import BookDetail from '@/views/Book/BookDetail.vue'

export default {
  name: 'BooksView',
  components: {
    ConfirmationDialog,
    BookDetail
  },
  data() {
    return {
      books: [],
      resourcesToShow: [],
      export: "",
      bookIdToDelete: null,
      sortAscending: true,
      isViewModalVisible: false,
      isCreateModalVisible: false,
      openDeleteConfirmDialog: false
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('isAdmin') === 'true'
    }
  },
  methods: {
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
    viewBook (index) {
      this.resourcesToShow = this.books[index].resources
      this.isViewModalVisible = true
    },
    openDeletePortfolioDialog(index){
      this.bookIdToDelete = this.books[index].id
      this.openDeleteConfirmDialog = true
    },
    editBook(index){
      this.$refs.BookDetail.selectedBook = this.books[index];
      this.isCreateModalVisible = true
    },
    orderBook(index) {
      console.log(index)
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
