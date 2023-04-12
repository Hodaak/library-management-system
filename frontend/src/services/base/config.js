export const API_URL = 'http://localhost:8000/' // Application for easy retrieval of API URL from API list in the future

export const API = {
  // user api
  auth: (args) => `auth/${args}`,
  user: (args) => `user/${args}`,
  order: (args) => `order/${args}`,
  book: (args) => `book/${args}`,
}
