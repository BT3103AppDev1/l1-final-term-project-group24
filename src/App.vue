<template>
  <router-view/>
</template>

<script>

import '@fortawesome/fontawesome-free/css/all.css'; 

export default {
  name: 'App'
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Fuzzy Bubbles');

#app {
  font-family: 'Fuzzy Bubbles';
  -webkit-font-smoothing: antialiased;
  -mos-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100vh;
}

body{
  background-color: #FDF0C3;
  font-family: 'Fuzzy Bubbles';
  margin: 0; /* To make the green nav bar flushed to the corners, remove if troublesome!*/
}

</style>