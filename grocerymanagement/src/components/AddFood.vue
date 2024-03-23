<template>
    <div v-if="showForm" class="food-form-overlay">
        <div class="food-form-content">
            <h2>Adding New Food</h2>
            <form @submit.prevent="submitFoodForm" class="food-form-container">
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
    export default {

        props: ['showForm'], 


        data() {
            return {
                foodName: '',
                foodQuantity: '',
                foodExpiryDate: '',
            };
        },
        methods: {
            submitFoodForm() {
                const foodData = {
                    name: this.foodName, 
                    quantity: this.foodQuantity, 
                    expiryDate: this.foodExpiryDate
                }; 
                this.$emit('add-food', foodData)
                this.closeFoodForm(); // Close the form after submission
            }, 

            closeFoodForm() { 
                this.$emit('close'); 
            }
        },
    };
</script>
   


<style scoped> 

    .food-form-overlay {
        display: block;
        position: fixed;
        z-index: 2; /* Ensure it's above other elements */
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4); /* Semi-transparent overlay */
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
        flex: 1; /* Take up available space */
        text-align: right; /* Align text to the right */
        margin-right: 10px; /* Space between the label and input */
    }

    .food-form-container .form-group input {
        flex: 2; /* Take up more space than the label */
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
        justify-content: center; /* Center the buttons */
        gap: 10px; /* Space between buttons */
    }



    .food-form-content h2 {
        text-align: center; 
    }

    .food-form-container input[type="text"],
    .food-form-container input[type="number"],
    .food-form-container input[type="date"] {
        border-radius: 20px; /* Adjust the value as needed to achieve the desired curvature */
        border: 1px solid green; /* Optional: Add a border if you want */
        color: #a0d18c; /* Optional: Change the text color */
        width: 100%; /* Optional: Set the width */
        height: 30px; /* Optional: Set the height */
        padding-left: 20px; /* Optional: Add padding to the left */
        box-sizing: border-box; 
    }

    .food-form-container input[type="text"]:focus,
    .food-form-container input[type="number"]:focus,
    .food-form-container input[type="date"]:focus {
        outline: none; /* Removes the default outline on focus */
        border: 1px solid #a0d18c; /* Optional: Change the border color on focus */
        color: green; /* Optional: Change the text color on focus */
    }


</style>





