<template>

  <div id="header-container">
    <br>
  </div>

  <div id="loginContainer">
    <img id="FoodFolioLogo" src="/foodfolio_logo.png" alt="FoodFolio logo"><br><br>
    <form @submit.prevent="loginCheck">
      <h1>Welcome to Foodfolio!</h1> <br>
      <div id="loginForm">
        <label for="email1"> Email: </label>
        <input type="email" id="email1" v-model="email" required="" placeholder="username@email.com"> <br><br>
        
        <label for="password1"> Password: </label>
        <input type="password" id="password1" v-model="password" required="" placeholder="***********"> <br><br>

        <div class="loginButton">
          <button id="loginButton" type="submit"> Login </button>
        </div>
        <br><br>
      </div>
    </form>
    <div class="forgot-container">
      <span class="forgot-prompt">Forgotten your login details?</span>
      <button class="forgot-button" @click="navigateToForgotPassword">Forgot Password.</button>
    </div>
    <div class="register-container">
      <span class="register-prompt">New user?</span>
      <button class="register-button" @click="navigateToRegistration">Create a new Account!</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '@/firebase.js';

export default {
  methods: {
    navigateToForgotPassword() {
      this.$router.push({ name: 'ForgotPassword' });
    },
    navigateToRegistration() {
      this.$router.push({ name: 'Registration' });
    },
    async loginCheck() {
      let email = this.email;
      let password = this.password;

      alert("Logging In...");

      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        alert("You have successfully Logged In!");
        this.$router.push({ name: 'Home' });
      } catch (error) {
        const errorMessage = error.message;
        if (errorMessage.includes("auth/invalid-email") || errorMessage.includes("auth/invalid-credential")) {
          alert("Please enter a valid email/password");
        } else { 
          alert(errorMessage);
        }
      }
      
    }
  },
  data() {
    return {
      email: '',
      password: ''
    };
  }
}
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

#loginContainer{
  margin: auto;
  color: #578855;
}

#FoodFolioLogo {
    width: 300px;
}

h1 {
  font-weight: bold;
}

form{
  height:200px; 
  text-align: center;
  width:100%;
}

#loginForm {
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

input[type="password"]::placeholder {
    font-family: 'Fuzzy Bubbles';
    font-size: 15px;
}

.loginButton {
  text-align: center;
}

#loginButton:hover {
  background-color: #f8961f; /* New color for hover */
  transform: scale(1.1); /* Increases size by 10% */
}

button {
    background-color: #FFB356;
    border-radius: 20px;
    color: #578855;
    padding: 5px 15px;
    cursor: pointer;
    font-family: 'Fuzzy Bubbles';
    font-size: 18px;
    transition: background-color 0.1s, transform 0.1s;
}

.forgot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}

.register-container {
  margin-top: 10px;
}

.forgot-prompt, .register-prompt {
  font-size: 14px;
  line-height: 21px;
  font-weight: bold;
}

.forgot-button, .register-button {
  background: none;
  border: none;
  color:#578855;
  margin-left: 5px;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  font-family: 'Fuzzy Bubbles';
  font-size: 14px;
}

.forgot-button:hover, .register-button:hover {
  font-weight: bold;
  color:#FFB356;
}
</style>
