//  FILE			   : OrderApi.js
//  PROJECT		   : SENG3080 - AWF :: Group Project
//  LAST VERSION : 2023-04-13
//  DESCRIPTION	 : this file contains api calls for Order Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Order
export const orderApi = {
  getAllOrders () {
    return service.get(`${API.order('')}?limit=100`)
  },

  getAllOrdersForUser () {
    return service.get(`${API.order('')}user/?limit=100`)
  },

  updateOrder(orderId, data){
    return service.post(`${API.order('')}return/${orderId}`, data)
  },
  orderBook (data) {
    return service.post(`${API.order('')}`, data)
  }
}
