<template>
  <v-app id="app">
    <Auth class="box_header" />
    <Home />
    <MessageBox />
    <LogoutDialog />
  </v-app>
</template>

<script>
import Home from './components/Home'
import MessageBox from './components/MessageBox'
import LogoutDialog from './components/LogoutDialog'
import Auth from './components/Auth'

export default {
  name: 'app',
  components: {
    MessageBox, LogoutDialog, Auth, Home
  }
}
</script>

<style>

* {
  font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
  -webkit-overflow-scrolling: touch;
}

#app {
  background: #26C6DA;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
