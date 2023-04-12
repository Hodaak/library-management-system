import service from './base/service'
import { API } from './base/config'

export const orderApi = {
  getAllOrders () {
    return service.get(`${API.order('')}?limit=100`)
  },

  getAllOrdersForUser () {
    return service.get(`${API.order('')}?limit=100`)
  },

  updateOrder(orderId, data){
    return service.post(`${API.order('')}return/${orderId}`, data)
  },
}
