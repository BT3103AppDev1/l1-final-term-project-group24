<script setup>
import AddCategory from './components/AddCategory.vue'; 


</script>

<template>
  <div id="app">
    <AddCategory /> 
  </div>
</template>

<style scoped>
.app-container {
 position: relative;
 /* Add any other styles you need for the container */
}

.add-categories-btn {
 padding: 10px 20px;
 background-color: #007bff;
 color: white;
 border: none;
 cursor: pointer;
 position: absolute;
 top: 0;
 left: 0;
}

.AddCategory {
 display: block;
 position: absolute;
 background-color: #f9f9f9;
 min-width: 160px;
 box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
 z-index: 1;
 top: 100%; /* Position the dropdown menu just below the button */
 left: 0; /* Align the dropdown menu to the left */
}

.AddCategory a {
 color: black;
 padding: 12px 16px;
 text-decoration: none;
 display: block;
}

.AddCategory a:hover {
 background-color: #f1f1f1;
}
</style>
