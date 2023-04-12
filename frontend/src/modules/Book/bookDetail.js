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
      type: Object,
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
          this.$emit('close-modal')
          const url = new URL(window.location.href);
          url.searchParams.set('alertMessage', 'Successfully added new book');
          url.searchParams.set('alertType', 'success');
          window.location.href = url.toString();
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
      console.log(`update book id: ${this.tempSelectedBook.id}`)
      await bookApi.updateBook(this.tempSelectedBook.id, JSON.stringify(inputs)).then(async response => {
        if (response && response.status === 200) {
          this.$emit('close-modal')
          const url = new URL(window.location.href);
          url.searchParams.set('alertMessage', 'Successfully updated a book');
          url.searchParams.set('alertType', 'success');
          window.location.href = url.toString();
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
    },
  }
}
