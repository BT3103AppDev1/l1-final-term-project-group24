<template>
  <div>
     <div v-for="(category, index) in selectedCategories" :key="index" class="category-item">
       <span class="category-name">{{ category }}</span>
       <button class="plus-button" @click="handlePlusButtonClick(index)">+</button>
       <button class="delete-button" @click="deleteCategory(index)">
         <i class="fas fa-trash"></i>
       </button>
     </div>
     <div v-for="foodCategory in foodItems" :key="foodCategory.category">
       <div v-for="item in foodCategory.items" :key="item.name" class="food-item" v-if="item">
         <p>{{ item.name }}</p>
         <p>Qty : {{ item.quantity }}</p>
         <p>Exp : {{ item.expiryDate }}</p>
         <button class="edit-button" @click="editItem(item)">
           <i class="fa fa-pencil" aria-hidden="true"></i>
         </button>
         <button class="deleteItem-button" @click="deleteItem(item)">
           <i class="fas fa-times"></i>
         </button>
       </div>
     </div>
  </div>
 </template>
 
 
<script>
export default {
	props: ['selectedCategories', 'foodItems'],

	methods: {
		handlePlusButtonClick(index) {
      const categoryName = this.selectedCategories[index]; 
			this.$emit('show-form', true);
      this.$emit('category-selected', categoryName)
		},
		deleteCategory(index) {
			this.$emit('delete-category', index);
		}, 

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
.category-item {
    text-align: center;
    padding: 10px 0; 
    margin-bottom: 10px; 
    display: block; 
    width: 100%; 

  }

  .category-name {
    text-align: center; 
    position: relative; 
    display: inline-block; 
  }

  .category-name::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 130%; 
    height: 2px; 
    background-color: green; 
    transform: translateX(-10%); 
  }

  .plus-button {
    background-color: transparent;
    border: none;
    color: black; 
    cursor: pointer;
    font-size: 16px; 
    margin-left: 10px; 
    
  }

  .plus-button:hover {
    background-color: green; 
    border: 1px solid green; 
  }

  .delete-button {
    background-color: transparent; 
    border: none; 
    color: black; 
    cursor: pointer; 
    font-size: 10px; 
    padding: 1px 1px; 
    transition: color 0.3s ease; 
  }


  .delete-button:hover {
    color: green; 
  }

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
 