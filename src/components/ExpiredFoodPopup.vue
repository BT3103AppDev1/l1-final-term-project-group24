<template>
    <div v-if="show && (expiredFoodItems.length > 0 || expiringFoodItems.length > 0)" class="modal-backdrop" @click="closePopup">
        <div class="popup-content">
             <h2>Expired and Expiring Food Items</h2>
            <div v-if="expiredFoodItems.length > 0">
                <h3>Expired Food Items:</h3>
                <ul>
                    <li v-for="item in expiredFoodItems" :key="item.id">{{ item.name }}</li>
                </ul>
            </div>
            <div v-if="expiringFoodItems.length > 0">
                <h3>Expiring Food Items:</h3>
                <ul>
                    <li v-for="item in expiringFoodItems" :key="item.id">{{ item.name }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
   
<script>
   export default {
    props: ['show', 'expiredFoodItems', 'expiringFoodItems'],
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
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.popup-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 40px;
    width: 80%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

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
