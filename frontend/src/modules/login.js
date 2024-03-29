/*
*  FILE			    : login.js
*  PROJECT		    : SENG3080 - AWF :: Group Project
*  LAST VERSION     : 2023-04-13
*  DESCRIPTION	    : this is a javascript file for LoginView.vue page
*/

import store from '@/store'
import {api} from '@/services/AuthApi'

export default {
  name: 'LoginPage',
  // these are properties used in this file
  data: () => ({
    msg: [],
    userNameLogin: '',
    passwordLogin: '',
    emptyFields: false
  }),
  // have multiple methods
  methods: {
    // this is going to be called when 'Login' button is pressed
    async doLogin () {
      if (this.userNameLogin === '' || this.passwordLogin === '') {
        this.emptyFields = true
      } else {
        // send API call './login'

        let loginFormData = new FormData();
        loginFormData.append('username', this.userNameLogin)
        loginFormData.append('password', this.passwordLogin)

        // since the request body requires form data, send the data as FormData instead of JSON
        const response = await api.logInUser(loginFormData, {
          withCredentials: true
        })

        if (response && response.status === 200) {
          console.log(response.data)
          const token = response.data.access_token
          const user = this.userNameLogin
          const isAdmin = response.data.is_admin
          // calling login method in auth.js to update 'store' object
          await store.dispatch('login', { token, user, isAdmin })
        } else {
          this.msg.failedMsg = response.data.detail
        }
      }
    }
  }
}
