<template>
  <div id="app">
    <MessageBox />
  </div>
</template>

<script>
import MessageBox from './components/MessageBox'

export default {
  name: 'app',
  components: {
    MessageBox
  }
}
</script>

<style>

* {
  font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
}

body {
  background-color: #2c3e50;
  padding-top: 60px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
