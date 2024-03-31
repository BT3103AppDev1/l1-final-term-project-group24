<template> 
  <div> 
    <AddCategory @category-selected="handleCategorySelected" @show-form="handleShowForm"/> 
    <DisplayCategoryAndFood :selectedCategories="selectedCategories" :foodItems="foodItems" @show-form="handleShowForm" @category-selected="handleCategorySelected" @delete-category="deleteCategory" @edit-item="handleEditItem" @delete-item="handleDeleteItem" />
    <AddFood :selectedCategory="selectedCategory" :show-form="showForm" @close="handleCloseForm" @add-food="addFoodItem"/>
    <editFood :show-edit-form="showEditForm" :item="itemToEdit" @update-item="handleUpdateItem" @close-edit-form="handleCloseEditForm"></editFood>
  </div>
</template>


<script> 
import AddCategory from '@/components/AddCategory.vue'; 
import AddFood from '@/components/AddFood.vue'; 
import DisplayCategoryAndFood from '@/components/DisplayCategoryAndFood.vue'
import editFood from '@/components/editFood.vue'; 

export default {
  components: {
    AddCategory, 
    DisplayCategoryAndFood,
    AddFood, 
    editFood, 
  }, 

  data() {
    return {
      selectedCategory: '', 
      selectedCategories: [], 
      showForm: false, 
      foodItem: '', 
      foodItems: [], 
      showEditForm: false, 
      itemToEdit: null, 
    };
  }, 

  methods: {

    handlePlusButtonClick(show) {
      this.showForm = show;
    }, 

    deleteCategory(index) {
      this.selectedCategories = this.selectedCategories.filter((category, i) => i !== index);
    }, 


		handleCategorySelected(categoryName) {
      console.log('Received category name:', categoryName);
      if (!this.selectedCategories.includes(categoryName)) {
        this.selectedCategories.push(categoryName);
      }
      this.selectedCategory = categoryName; 
    },

    handleShowForm(show) {{    
      this.showForm = show; 
    }}, 

    handleCloseForm() { 
      this.showForm = false; 
    }, 

    addFoodItem(food) {
      console.log('Received add-food event with category:', this.selectedCategory, ' and item:', food);      
      const categoryIndex = this.foodItems.findIndex(cat => cat.category == this.selectedCategory); 
      if (categoryIndex != -1) {
        console.log(this.foodItems[categoryIndex]);
        this.foodItems[categoryIndex].items.push(food);
        // this.foodItem = food; 
        console.log('Food item added:', this.foodItem);
      } else {
        this.foodItems.push({ category: this.selectedCategory, items: [food] });
        // this.foodItem = food; 
      }
    }, 

    handleEditItem(item) {
      this.itemToEdit = item; 
      this.showEditForm = true; 
      console.log(this.itemToEdit);
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

