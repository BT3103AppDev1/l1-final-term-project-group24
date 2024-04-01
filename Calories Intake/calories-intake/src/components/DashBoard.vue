<template>
    <div id="toReplace">
    <div :is="currentComponent"></div>
    <div v-show="currentComponent">
      <button @click="swapComponent()">change</button>
    </div>
    </div>
    <button @click="swapComponent()">Close</button>
</template>

<script>
import Table from "./Table.vue"
import AddMeal from "./AddMeal.vue"

export default {
    data() {
        return {
            currentComponent: Table
        };
    },
    components: {
        Table,
        AddMeal
    },
    methods: {
        swapComponent() {
            return Table
        }
    }
};
</script>
