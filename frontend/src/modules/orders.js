import { orderApi } from '../services/OrderApi'
export default {
  components: {
    
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
        orderIdToUpdate: null
      };
    },
    async mounted () {
      await this.loadOrders()
    },
    methods: {
      async loadOrders() {
        let ordersRsp;
        // Check if the user is an admin or a regular user
        if (localStorage.getItem("isAdmin").toLowerCase() == "true") { // Replace userIsAdmin with the actual condition to check if the user is an admin
            this.isAdmin = true
            ordersRsp = await orderApi.getAllOrders();
        } else {
            ordersRsp = await orderApi.getAllOrdersForUser();
        }
        this.orders = ordersRsp.data;
        console.log('this.orders ', this.orders)
      },
      sortData() {
        let sortedDataArray = this.orders.slice()
        sortedDataArray.sort((a, b) => {
          if (this.sortAscending) {
            return a.order_title.localeCompare(b.order_title)
          } else {
            return b.order_title.localeCompare(a.order_title)
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
        if (this.orderIdToUpdate !== null) {
            orderApi.updateOrder(this.orderIdToUpdate).then(response => {
                if(response && response.status === 200){
                this.isReturnedDisabled = true
                location.reload()
                }
            })
            } else {
            console.warn('No order ID to update!')
        }
      }
    }
  }
