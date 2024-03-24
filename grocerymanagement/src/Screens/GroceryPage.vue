<template> 
    <div> 
        <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
        <AddFood :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
        <DisplayFood :foodItems="foodItems" /> 
    </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayFood from '@/components/DisplayFood.vue'; 

export default {
    components: {
        AddCategory, 
        AddFood, 
        DisplayFood, 
    }, 

    data() {
        return {
            selectedCategory: '', 
            showForm: false, 
            foodItems: [], 
        };
    }, 

    methods: {
        handleCategorySelected(category) {
            this.selectedCategory = category; 
        },

        handleShowForm(show) {{
            this.showForm = show; 
        }}, 

        handleCloseForm() {
            this.showForm = false; 
        }, 

        addFoodItem(foodData) {
            const categoryIndex = this.foodItems.findIndex(category => category.category === foodData.category); 
            if (categoryIndex !== -1) {
            this.foodItems[categoryIndex].items.push(foodData); 
            } else {
            this.foodItems.push({ category: foodData.category, items: [foodData] }); 
            }
        }, 
    }
}; 


</script>

