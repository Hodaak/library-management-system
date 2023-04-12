// this file contains api calls for Book Entity

import service from './base/service'
import { API } from './base/config'

// these are the api calls specific to User
export const bookApi = {
  getBookByID (bookId) {
    return service.get(`${API.book('')}id/${bookId}`, )
  },
  getBookByTitle (titleId) {
    return service.get(`${API.book('')}title/${titleId}`, )
  },
  getBookByAuthor (authorId) {
    return service.get(`${API.book('')}author/${authorId}`, )
  },
  getAllBooks () {
    return service.get(`${API.book('')}`)
  },
  createBook (data) {
    return service.post(`${API.book('')}`, data)
  },
  updateBook (bookId, data) {
    return service.put(`${API.book('')}${bookId}`, data)
  }
}
