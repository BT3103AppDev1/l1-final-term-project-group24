<template>
    <header>
        <div class="logo">
            <img src="@/assets/logo.png" alt="Food Folio Logo" class="logo">
        </div>
        
        <nav class="navigation">
            <a href="Grocery Management">Grocery Management</a>
            <a href="Calorie Intake" class="active">Calorie Intake</a>
            <a href="About Us">About Us</a>
        </nav>

        <div class="date">
            <span>{{ currentDate }}</span>
        </div>

        <button class="profile">
            <img src="@/assets/profile.png" alt="Profile" class="profile">
            </button>
    </header>
</template>

<script>

export default {
    name: 'Header',
    data() {
        return {
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
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

header {
    background: #578855;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 13%;
    padding: 30px 100px;
    display: flex;
    align-items: center;
    z-index: 100;
}

.logo {
    height: 150px;
    pointer-events: none;
    display: flex;
    justify-content: flex-start;
}

.navigation a {
    text-decoration: none;
    color: #fef0c5;
    padding: 6px 15px;
    border-radius: 20px;
    margin: 0 10px;
    font-weight: 600;
}

.navigation a:hover,
.navigation a.active {
    background: #fef0c5;
    color: #578855;
}

.date {
    color: #fef0c5;
    position: relative;
    left: 450px;
}

button {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  transition: transform .7s ease-in-out;
  margin-left: auto;
}

button:hover{
    opacity: 0.5;
}

.profile {
    width: 100px;
    height: 85px;
}

</style>
