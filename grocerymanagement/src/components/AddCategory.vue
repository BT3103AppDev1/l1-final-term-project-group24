<template>
    <div>
        <button @click="toggleDropdown" class="add-categories-btn" :class="{ rotate: showDropdown }">Add Categories</button>
        <div v-if="showDropdown" class="dropdown-menu">
         <a href="#">Breakfast Foods</a>
         <a href="#">Fruits</a>
         <a href="#">Vegatables</a>
         <a href="#">Cooking Essentials</a>
         <a href="#">+ Add Custom</a>
       </div>
    </div>
</template>
   
<script>
   export default {
    data() {
       return {
         showDropdown: false
       }
    },
    methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      }
    }
   }
</script>
   
   
<style scoped>
   .add-categories-btn {
        padding: 10px 20px;
        background-color: orange;
        color: green;
        border: none;
        cursor: pointer;
        border-radius: 20px; 
        border: 1px solid green; 
        position: relative; 
   }
   
   .add-categories-btn::after {
        content: '';
        position: absolute;
        right: 5px; /* Adjust as needed */
        top: 50%;
        transform: translateY(-50%) rotate(0deg);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid green; /* Triangle color */
        transition: transform 0.3s ease-in-out;
    }

    .add-categories-btn.rotate::after {
        transform: translateY(-50%) rotate(180deg);
    }


   .dropdown-menu {
        display: block;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 20px; 
        border: 1px solid green; 
   }
   
   .dropdown-menu a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
   }
   
   .dropdown-menu a:hover {
        background-color: #f1f1f1
    }
</style>
   