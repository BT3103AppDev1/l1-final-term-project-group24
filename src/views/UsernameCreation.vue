<template>
  <div id="newUsernameContainer" v-if="username">
    <img id="FoodFolioLogo" src="/foodfolio_logo.png" alt="FoodFolio logo"><br><br>
    <form @submit.prevent="submitUsername">
      <h1>Choose Your Username</h1> <br>
      <div id="usernameForm">
        <label for="username1"> Username: </label>
        <input type="text" id="username1" v-model="username" required="" placeholder="Enter username"> <br><br>

        <div class="confirmButton">
          <button type="submit" id="confirmButton">Confirm</button>
        </div>
      </div>
    </form>
  </div>
</template>



<script>
import { getAuth, updateProfile } from 'firebase/auth';

export default {
  data() {
    return {
      user: '',
    };
  },
  methods: {
    async submitUsername() {
      try {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { displayName: this.username });
        console.log("Updating username to: " + auth.currentUser.displayName);
        this.$router.push({ name: 'Home' });
      } catch (error) {
        alert("Error updating profile: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
#header-container {
  background-color: #578855;
  padding: 16px;
  margin: 0;
  width: 100%;
  /* Ensures there's no space between the header and the edges of the browser window */
  position: absolute;
  top: 0;
  left: 0;
}

#FoodFolioLogo {
    width: 300px;
}

#newUsernameContainer {
  margin: auto;
  color: #578855;
}

h1 {
  font-weight: bold;
}

form {
  height: 200px;
  text-align: center;
  width: 100%;
}

#usernameForm {
  display: inline-block;
  text-align: right;
}

input {
    width: 300px;
    padding: 10px;
    border-radius: 20px;
    border-color: #578855;
    background-color: #FDF0C3;
    font-family: 'Fuzzy Bubbles', cursive;
    font-size: 15px;
}

input[type="email"]::placeholder {
    font-family: 'Fuzzy Bubbles';
    font-size: 15px;
}

button {
    background-color: #FFB356;
    border-radius: 20px;
    color: #578855;
    padding: 5px 15px;
    cursor: pointer;
    font-family: 'Fuzzy Bubbles';
    transition: background-color 0.1s, transform 0.1s;
}

.confirmButton {
  text-align: center;
}

#confirmButton {
  font-size: 14px;
}

#confirmButton:hover {
  background-color: #f8961f; /* New color for hover */
  transform: scale(1.1); /* Increases size by 10% */
}
</style>