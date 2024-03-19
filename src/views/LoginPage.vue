<template>
  <div id="loginContainer">
    <form @submit.prevent="loginCheck">
      <h1>firebase</h1> <br>
      <div id="loginForm">
        <label for="email1"> Email: </label>
        <input type="email" id="email1" v-model="email" required="" placeholder="username@email.com"> <br><br>
        
        <label for="password1"> Password: </label>
        <input type="password" id="password1" v-model="password" required="" placeholder="***********"> <br><br>

        <div class="loginButton">
          <button id="loginButton" type="submit"> Login </button>
        </div>
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
import firebaseApp from '@/firebase.js';

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
        await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
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


<style>
#loginContainer{
  margin: auto;
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

.loginButton {
  text-align: center;
}

.forgot-container, .register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.forgot-prompt, .register-prompt {
  font-size: 12px;
  line-height: 21px;
}

.forgot-button, .register-button {
  background: none;
  border: none;
  color: #0645AD;
  margin-left: 5px;
  padding: 0;
  cursor: pointer;
}

.forgot-button:hover, .register-button:hover {
  text-decoration: underline;
}
</style>
