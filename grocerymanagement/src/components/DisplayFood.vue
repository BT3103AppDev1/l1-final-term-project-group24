<template>


    <div v-for="(category, index) in foodItems" :key="index" > 
        <div v-for="item in category.items" :key="item.name" class="food-item">
            <p>Name : {{ item.name }}</p>
            <p>Qty : {{ item.quantity }}</p>
            <p>Exp : {{  item.expiryDate  }}</p>
        </div>
    </div>
</template>

<script> 
    export default {
        props: ['foodItems'], 
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

</style> 