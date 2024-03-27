<template> 
    <div> 
        <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
        <AddFood :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
        <DisplayFood :foodItems="foodItems" @edit-item="handleEditItem" @delete-item="handleDeleteItem"/> 
        <editFood :show-edit-form="showEditForm" :item="itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
    </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayFood from '@/components/DisplayFood.vue'; 
import editFood from '@/components/editFood.vue'; 

export default {
    components: {
        AddCategory, 
        AddFood, 
        DisplayFood,
        editFood, 
    }, 

    data() {
        return {
            selectedCategory: '', 
            showForm: false, 
            foodItems: [], 
            showEditForm: false, 
            itemToEdit: null, 
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

        handleEditItem(item) {
            this.itemToEdit = item; 
            this.showEditForm = true; 
        }, 


        //still debugging : not ready yet 
        handleUpdateItem(updatedItem) {
            console.log('Updating item:', updatedItem);
            const categoryIndex = this.foodItems.findIndex(category => {
                console.log('checking category', category.category); 
                return category.items.some(item => {
                    console.log('comparing item', item.name, 'with updateditem', updatedItem.name); 
                    return item.name === updatedItem.name;
                });
            }); 
    
            if (categoryIndex != -1) {
             console.log('hi'); 
                const itemIndex = this.foodItems[categoryIndex].items.findIndex(item => item.name === updatedItem.name); 
        
                if (itemIndex !== -1) {
                    this.$set(this.foodItems[categoryIndex].items, itemIndex, updatedItem); 
                    console.log('Food items after update:', this.foodItems);
                }
            }

            this.showEditForm = false;
        },



        handleDeleteItem(itemToDelete) {
            const category = this.foodItems.find(category => category.items.includes(itemToDelete)); 
            if (category) {
                category.items = category.items.filter(item => item !== itemToDelete); 
            }
        },

        handleCloseEditForm() {
            this.showEditForm = false; 
        },
    },
}; 


</script>

