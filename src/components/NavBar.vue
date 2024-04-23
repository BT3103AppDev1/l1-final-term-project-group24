<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="logo-container">
        <img id="FoodFolioLogo" src="/foodfolio_logo.png" alt="FoodFolio logo">
      </div>
      <div class="nav-links">
          <router-link to="/home" id="home-button">Grocery Management</router-link>
          <router-link to="/caloriesIntake" id="calorie-button">Calorie Intake</router-link>
          <router-link to="/about" id="about-button">About Us</router-link>
      </div>
      <router-view/>

      <div class="nav-profileicon">
        <span id="current-date">{{ this.currentDate() }}</span>
        <div @mouseover="cancelCloseDropdown" @mouseout="scheduleCloseDropdown">
          <img id="profile-icon" src="/profile_icon.png" alt="Profile" @mouseover="openDropdown">
          <div v-if="showDropdown" class="dropdown">
            <router-link to="/profile" id="profile-button">Go to Profile</router-link>
            <button id="logoutButton" @click="logout"> Logout </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
  
  <script>
  import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

  export default {
    data() {
      return {
        showDropdown: false,
      };
    },
    methods: {
      currentDate() {
        const now = new Date(); 
        now.setHours(0, 0, 0, 0);
        const month = now.getMonth() + 1; // Months are zero-based
        const day = now.getDate();
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
      }, 
      openDropdown() {
        this.showDropdown = true;
        this.cancelCloseDropdown(); // Cancel any pending close action
      },
      scheduleCloseDropdown() {
        this.closeTimeout = setTimeout(() => {
          this.showDropdown = false;
        }, 200);
      },
      cancelCloseDropdown() {
        // Cancel the scheduled close if still within the hover area
        clearTimeout(this.closeTimeout);
      },

      logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
          alert("Logged out successfully!")
          this.$router.push({ name: 'Login' });
        }).catch((error) => {
            alert("Logout Failed: " + error.message);
        });
      },
    },
  };
  </script>

<style scoped>

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #578855; 
  box-sizing: border-box;
  width: 100vw;
  position: relative; 
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  width: 100%;
  align-items: center;
}

#FoodFolioLogo {
  width: 80px;
  padding-bottom: 4px;
}

.nav-links {
  display: flex; 
  padding: 10px;
  font-size: 18px;
}

#home-button:hover, #calorie-button:hover, #about-button:hover {
    transform: scale(1.1);
    font-weight: bold;
    transition: background-color 0.1s, transform 0.1s;
}

.nav-links > a {
  color: black;
  margin-left: 10px;
  margin-right: 20px;
  text-decoration: none;
}

.nav-links > .router-link-active {
  color: #FDF0C3;
  font-weight: bold;
}

.nav-profileicon {
  display: flex; 
  align-items: center;
  padding-right: 20px;
  z-index: 1000; /* so the dropdown list is not blocked by anything */
}

.nav-profileicon .dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white; 
  border: 1px solid black;
  border-radius: 5px;
}

.nav-profileicon .dropdown > * {
  padding: 15px 20px;
}

#profile-icon {
 width: 50px;
 height: 50px;
 border-radius: 50px;
}

#profile-icon:hover {
    background-color: #FDF0C3; 
    transform: scale(1.1);
    cursor: pointer;
    transition: background-color 0.1s, transform 0.1s;
}

#profile-button {
    color: black;
    text-decoration: none;
}

#logoutButton {
    background-color: white;
    border: none;
    font-family: 'Fuzzy Bubbles';
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 15px;
}

#logoutButton:hover, #profile-button:hover {
    background-color: #f8961f; 
    transform: scale(1.00);
}

#current-date {
    padding: 20px 30px;
    font-weight: bold;
    font-size: 18px;
}
</style>