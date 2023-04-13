/*
*  FILE			    : config.js
*  PROJECT		    : SENG3080 - AWF :: Group Project
*  LAST VERSION     : 2023-04-13
*  DESCRIPTION	    : this file contains configuration of services
*/

export const API_URL = 'http://localhost:8000/' // Application for easy retrieval of API URL from API list in the future

export const API = {
  // user api
  auth: (args) => `auth/${args}`,
  user: (args) => `user/${args}`,
  book: (args) => `book/${args}`,
  order: (args) => `order/${args}`,
}
