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
  mounted () {
    this.loadBooks();
  },
  methods: {
    async loadBooks () {
      // const resourcesRsp = await fileApi.getAllResources()
      // this.resources = resourcesRsp.data
      // console.log('this.resources ', this.resources )
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
    openDeletePortfolioDialog(index){
      this.bookIdToDelete = this.books[index].id
      this.openDeleteConfirmDialog = true
    },
    editBook(index){
      this.$nextTick(() => {
        this.$refs.BookDetail.$props.selectedBook = this.books[index];
      });
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
