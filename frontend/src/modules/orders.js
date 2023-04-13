import { orderApi } from '../services/OrderApi'
import ConfirmationDialog from '../components/ConfirmationDialog.vue'
export default {
  components: {
    ConfirmationDialog
  },
  computed: {
    filteredOrders() {
      if (!this.searchText) {
        return this.orders;
      }
      const searchTextLower = this.searchText.toLowerCase();
      return this.orders.filter(order => {
        return (
          order.book.title.toLowerCase().includes(searchTextLower) ||
          order.book.author_name.toLowerCase().includes(searchTextLower)
        );
      });
    }
  },
  data() {
    return {
      sortAscending: true,
      NameOfPage: '',
      isPopupVisible: false,
      orders: [],
      orderDisplayed: null,
      isAdmin: false,
      openReturnConfirmDialog: false,
      isReturnedDisabled: false,
      orderIdToUpdate: null,
      searchText: ""
    };
  },
  async mounted () {
    await this.loadOrders()
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
    async loadOrders() {
      let ordersRsp;
      // Check if the user is an admin or a regular user
      if (localStorage.getItem("isAdmin").toLowerCase() == "true") {
        this.isAdmin = true
        ordersRsp = await orderApi.getAllOrders();
      } else {
        ordersRsp = await orderApi.getAllOrdersForUser();
      }
      this.orders = ordersRsp.data;
      console.log(this.orders)
    },
    sortData() {
      let sortedDataArray = this.orders.slice()
      sortedDataArray.sort((a, b) => {
        if (this.sortAscending) {
          return a.book.title.localeCompare(b.book.title)
        } else {
          return b.book.title.localeCompare(a.book.title)
        }
      })
      this.orders = sortedDataArray
      this.sortAscending = !this.sortAscending
    },
    openReturnDialog(index){
      this.orderIdToUpdate = this.orders[index].id
      this.openReturnConfirmDialog = true
    },
    updateReturnStatus() {
      this.isReturnedDisabled = true
      if (this.orderIdToUpdate !== null) {
          orderApi.updateOrder(this.orderIdToUpdate).then(response => {
            if(response && response.status === 200){            
              const url = new URL(window.location.href);
              url.searchParams.set('alertMessage', 'Successfully Returned the Book!');
              url.searchParams.set('alertType', 'success');
              window.location.href = url.toString();
            }
          })
          } else {
          console.warn('No order ID to update!')
        }
      }
    }
  }
