<!--
  FILE			    : App.vue
  PROJECT		    : SENG3080 - AWF :: Group Project
  LAST VERSION  : 2023-04-13
  DESCRIPTION	  : This is a root of the application defined in Vue.js Component file format
-->

<template>
<div>
  <!-- <Sidebar/> -->
  <div v-if="shouldShowSidebar">
      <Sidebar ></Sidebar>
  </div>
  <div v-else style="width: auto">
    <router-view/>
  </div>
</div>
</template>

<script>
import Sidebar from '@/components/sidebar/SideBar.vue'

export default {
  name: 'App',
  components: { Sidebar },
  computed: {
    shouldShowSidebar () {
      return this.$route.meta.sidebar !== false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
  text-align: center;
}

</style>
