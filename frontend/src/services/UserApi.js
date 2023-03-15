// this file contains api calls for User Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const userApi = {
  getUserByID (userId) {
    return service.get(`${API.user('')}${userId}`, )
  },
  getAllUsers () {
    return service.get(`${API.user('')}`)
  },
  createUser (data) {
    return service.post(`${API.user('')}`, data)
  }
}
