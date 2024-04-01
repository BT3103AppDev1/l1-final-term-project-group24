<template>
    <div id="toReplace">
        <h3 v-if="currentComponent = 'Table'">{{ currentDate }}</h3>
        <component :is='currentComponent'/>
        <button @click="swapComponent">change</button>
    </div>
</template>

<script>
import Table from "./Table.vue"
import AddMeal from "./AddMeal.vue"

export default {
    components: {
        Table,
        AddMeal
    },
    data() {
        return {
            currentComponent: Table,
            currentDate: ''
        };
    },
    created() {
        this.currentDate = this.formatDate(new Date())
    },
    methods: {
        formatDate(date) {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return `${day}/${month}/${year}`;
        },
        async swapComponent() {
            this.currentComponent = AddMeal
        }
    }
};
</script>
