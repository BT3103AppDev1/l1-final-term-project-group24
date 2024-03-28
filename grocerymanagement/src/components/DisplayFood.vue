<template>
    <div v-for="(category, index) in foodItems" :key="index" > 
        <div v-for="item in category.items" :key="item.name" class="food-item">
            <p>{{ item.name }}</p>
            <p>Qty : {{ item.quantity }}</p>
            <p>Exp : {{  item.expiryDate  }}</p>
            <button class="edit-button" @click="editItem(item)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button class="deleteItem-button" @click="deleteItem(item)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script> 

import '@fortawesome/fontawesome-free/css/all.css'; 

    export default {
        emits:['edit-item', 'delete-item'], 
        props: ['foodItems'], 
        methods: {
            editItem(item) {
                this.$emit('edit-item', item); 
            }, 

            deleteItem(item) {
                this.$emit('delete-item', item); 
            }
        }
    }; 

</script>

<style scoped> 

    .food-item {
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        border: 1px solid black; 
        padding: 10px; 
        margin-bottom: 10px; 
        border-radius: 40px; 
    }

    .food-info {
        display: flex; 
        justify-content: space-between; 
        width: 100%; 
    }


    .edit-button {
        background-color: transparent; 
        border: none; 
        margin-left: 100px; 
        cursor: pointer; 
        color: black;
    }

    .edit-button:hover {
        color: green;
    }

    .deleteItem-button {
        background-color: transparent; 
        border: none;
        color: black; 
        cursor: pointer; 
        transition: color 0.3s ease; 
        margin-right: 100px; 

    }


    .deleteItem-button:hover {
        color:green; 
    }

</style> 