<template>
    <div v-if="showForm" class="food-form-overlay">
        <div class="food-form-content">
            <h2>Adding New {{ this.selectedCategory }}</h2>
            <form @submit.prevent="submitFoodForm" class="food-form-container" id="food-form">
                <div class="form-group">
                    <label for="foodName">Food:</label>
                    <input type="text" id="foodName" v-model="foodName" required placeholder="Enter your Food">
                </div>
                <div class="form-group">
                    <label for="foodQuantity">Quantity:</label>
                    <input type="number" id="foodQuantity" v-model="foodQuantity" required placeholder="Enter the Quantity">
                </div>
                <div class="form-group">
                    <label for="foodExpiryDate">Expiry Date:</label>
                    <input type="date" id="foodExpiryDate" v-model="foodExpiryDate" required placeholder="Enter the Expiry Date">
                </div>
                <div class="button-container">
                    <button type="button" @click="closeFoodForm">Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>
   
<script>

import { db } from '../firebase.js'; 
import { getFirestore } from 'firebase/firestore'
import { collection, doc, setDoc } from 'firebase/firestore';

    
    function generateUniqueId(prefix = 'food_') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    export default {

        props: ['showForm', 'selectedCategory', 'userEmail'], 


        data() {
            return {
                foodName: '',
                foodQuantity: '',
                foodExpiryDate: '', 
                category: this.selectedCategory, 
                allCategories: [],
            };
        },

        watch: {
            userEmail: {
            immediate: true,
                handler(newVal, oldVal) {
                    console.log("userEmail in AddFood:", newVal);
                }
            }
        },

        methods: {

            async submitFoodForm() {

                const foodItem = {
                    id: generateUniqueId(), 
                    name: this.foodName, 
                    quantity: this.foodQuantity, 
                    expiryDate: this.foodExpiryDate, 
                    category: this.selectedCategory, 
                }; 
                
                
                const categoryRef = collection(db, `${this.userEmail}/grocery-management/${this.selectedCategory}`); 

                await setDoc(doc(categoryRef, foodItem.id), foodItem); 
                
                console.log('food item added to firestore', foodItem); 
                console.log('Emitting add-food event with:', {item: foodItem });

                this.$emit('add-food', foodItem )

                // Reset form after submission
                this.foodName = ''; 
                this.foodQuantity = '';
                this.foodExpiryDate = '';

                this.closeFoodForm(); // Close the form after submission
            }, 

            closeFoodForm() { 
                this.$emit('close'); 
            },
        },
    };
</script>
   


<style scoped> 

    .food-form-overlay {
        display: block;
        position: fixed;
        z-index: 2; 
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4); 
    }

    .food-form-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        border-radius: 40px; 
    }

    .food-form-container .form-group {
        display: flex;
        align-items: center; 
        gap: 10px;
        margin-bottom: 10px; 


  
    }

    .food-form-container .form-group label {
        flex: 1; 
        text-align: right; 
        margin-right: 10px; 
    }

    .food-form-container .form-group input {
        flex: 2; 
    }
    .food-form-container button {
        padding: 5px 10px; 
        margin: 0 5px; 
        background-color: orange; 
        color: green; 
        border: none; 
        cursor: pointer; 
        border-radius: 20px; 
        width: auto; 
    }

    .food-form-container .button-container {
        display: flex;
        justify-content: center; 
        gap: 10px; 
    }



    .food-form-content h2 {
        text-align: center; 
    }

    .food-form-container input[type="text"],
    .food-form-container input[type="number"],
    .food-form-container input[type="date"] {
        border-radius: 20px; 
        border: 1px solid green; 
        color: #a0d18c; 
        width: 100%; 
        height: 30px; 
        padding-left: 20px; 
        box-sizing: border-box; 
    }

    .food-form-container input[type="text"]:focus,
    .food-form-container input[type="number"]:focus,
    .food-form-container input[type="date"]:focus {
        outline: none; 
        border: 1px solid #a0d18c; 
        color: green; 
    }


</style>





