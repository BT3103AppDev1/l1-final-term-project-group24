<template>
 <div v-if="show && expiredItems.length > 0" class="modal-backdrop" @click="closePopup">
    <div class="popup-content">
         <h2>Expired and Expiring Food Items</h2>
         <ul>
           <li v-for="item in expiredItems" :key="item.id">{{ item.name }}</li>
         </ul>
         <button @click="closePopup">Close</button>
       </div>
    </div>
</template>
   
<script>
   export default {
    props: ['show', 'expiredItems'],
    methods: {
       closePopup() {
         this.$emit('close');
       }
    }
   }
</script>


<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent backdrop */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background-color: #fefefe; /* Solid white background */
    padding: 20px;
    border: 1px solid #888;
    border-radius: 40px;
    width: 80%;
    max-width: 500px; /* Ensure it doesn't get too wide on larger screens */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
}

/* Additional styling for consistency with your form */
.popup-content h2 {
    text-align: center;
    margin-bottom: 20px;
}

.popup-content ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.popup-content li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.popup-content button {
    background-color: orange;
    color: green;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;
    width: auto;
}
</style>
