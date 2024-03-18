
<template>
    <div v-if="showModal" class="modal-overlay">
       <div class="modal-content">
         <span class="close" @click="closeModal">&times;</span>
         <form @submit.prevent="submitForm">
           <label for="categoryName">Category Name:</label>
           <input type="text" id="categoryName" v-model="categoryName" required>
           <button type="submit">Submit</button>
           <button type="button" @click="closeModal">Cancel</button>
         </form>
       </div>
    </div>
</template>
   
<script>
   export default {
    data() {
       return {
         showModal: false,
         categoryName: ''
       };
    },
    methods: {
       openModal() {
         this.showModal = true;
       },
       closeModal() {
         this.showModal = false;
       },
       submitForm() {
         // Handle form submission here
         console.log(this.categoryName);
         this.closeModal();
       }
    }
   };
</script>
   
<style scoped>
   .modal-overlay {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4); /* Semi-transparent overlay */
   }
   
   .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
   }
   
   .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
   }
   
   .close:hover,
   .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
   }
</style>
   