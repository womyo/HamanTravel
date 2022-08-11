<template>
  <div id="app">
    <Header></Header>
    <section class="section">
      <router-view/>
    </section>
  </div>  
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background: url(https://cdn.pixabay.com/photo/2018/02/01/06/45/travel-3122702_1280.jpg) no-repeat center;
  background-size: cover;
}
</style>
