import BookDetail from '../../views/Book/BookDetail.vue';
import { MDBIcon  } from "mdb-vue-ui-kit";
import {bookApi} from '@/services/BookApi'

export default {
  components:{
      BookDetail,
      MDBIcon
  },
  props: {
    // when we want to update Book
    bookToUpdate: {
      type: Array,
      required: false,
      default: null
    },
  },
  data(){
    return {
      // properties for UI
      bookMsg: [],
      tempSelectedBook: null,

      // adding new Book
      newBookId: "",
      newBookTitle: "",
      newBookAuthor: "",
      newBookQuantity: 1,
    }
  },
  mounted () {
    if(this.bookToUpdate){
      this.tempSelectedBook = Object.assign({}, this.bookToUpdate);
    }
  },
  methods: {
    async createNewBook() {
      const inputs = {
        book_id: this.newBookId,
        title: this.newBookTitle,
        author_name: this.newBookAuthor,
        quantity: this.newBookQuantity,
      }

      await bookApi.createBook(JSON.stringify(inputs)).then(response => {
        if (response && response.status === 200) {
          this.$refs.alert.showAlert('success',
          'Successfully added new book',
          'Success')
          this.resetForm();
        }
        else {
          this.$refs.alert.showAlert('error',
          response.data.detail,
          'Error')
        }
      });
    },
    async updateBook() {
      const inputs = {
        book_id: this.tempSelectedBook.book_id,
        title: this.tempSelectedBook.title,
        author_name: this.tempSelectedBook.author_name,
        quantity: this.tempSelectedBook.quantity,
      }
      await bookApi.updateBook(this.tempSelectedBook.id, JSON.stringify(inputs)).then(async response => {
        if (response && response.status === 200) {
          this.$emit('close-modal')
          location.reload()
          await this.$refs.alert.showAlert('success',
            'Successfully updated a book',
            'Success')
        } else {
          this.$refs.alert.showAlert('error',
            response.data.detail,
            'Error')
        }
      });
    },
    resetForm() {
      this.newBookId = "";
      this.newBookTitle = "";
      this.newBookAuthor = "";
      this.newBookQuantity = 1;
    }
  }
}
