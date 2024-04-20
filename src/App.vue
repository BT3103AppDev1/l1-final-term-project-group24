<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/logo.png" alt="Food Folio Logo" class="logo">
      </div>

      <nav class="navigation">
        <router-link to="/home" class="nav-link" :class="{ active: activeLink === 'home' }" @click="setActiveLink('home')">Grocery Management</router-link>
        <router-link to="/caloriesIntake" class="nav-link" :class="{ active: activeLink === 'caloriesIntake' }" @click="setActiveLink('caloriesIntake')">Calorie Intake</router-link>
        <router-link to="/about" class="nav-link" :class="{ active: activeLink === 'about' }" @click="setActiveLink('about')">About Us</router-link>
      </nav>

      <div class="user-info">
        <div class="date">
          <span>{{ currentDate }}</span>
        </div>

        <router-link to="/profile" @click="toggleProfileActive">
          <img src="@/assets/profile.png" alt="Profile" class="profile" :class="{ active: isProfileActive }">
        </router-link>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'; 

export default {
  name: 'App',
  data() {
    return {
      currentDate: '',
      isProfileActive: false,
      activeLink: 'home'
    };
  },
  created() {
    this.currentDate = this.formatDate(new Date());
    this.activeLink = this.$route.path.substr(1) || 'home'; 
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
      toggleProfileActive() {
        this.isProfileActive = !this.isProfileActive;
        if (this.isProfileActive) { 
          this.activeLink = '';
        }
      },
      setActiveLink(link) {
        this.activeLink = link;
        this.isProfileActive = false; 
      }
    }
  }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fuzzy Bubbles');
@import url('https://fonts.googleapis.com/css?family=Poppins');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fuzzy Bubbles';
}

#app {
  font-family: 'Fuzzy Bubbles';
  text-align: center;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100vh;
}

body {
  background-color: #FDF0C3;
  font-family: 'Fuzzy Bubbles';
  margin: 0;
}

header {
  background-color: #578855;
  padding: 20px 10px;
  color: white;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  z-index: 100;
}

.logo {
  height: 100px;
  pointer-events: none;
  display: flex;
  justify-content: flex-start;
}

.navigation .nav-link {
  text-decoration: none;
  color: #fef0c5;
  padding: 6px 15px;
  border-radius: 20px;
  margin: 0 10px;
  font-weight: 600;
}

.navigation .nav-link:hover,
.navigation .nav-link.active {
  background: #fef0c5;
  color: #578855;
}

.date {
  color: #fef0c5;
  position: relative;
  width: 100%;
  top: 50px;
  left: 600px;
}

.profile {
  position: relative;
  width: 100%;
  left: 500px;
  height: 85px; 
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
  transition: transform .7s ease-in-out;
  margin-left: auto;
}

.profile.active,
.profile:hover {
  opacity: 0.5; 
}

</style>
