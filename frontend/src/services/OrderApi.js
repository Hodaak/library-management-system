// this file contains api calls for Order Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to Order
export const orderApi = {
  orderBook (data) {
    return service.post(`${API.order('')}`, data)
  },
}
