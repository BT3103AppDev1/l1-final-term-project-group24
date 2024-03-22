<template>
  <div id="header-container">
    <br>
  </div>

  <div id="forgetPasswordContainer">
    <form @submit.prevent="submitForgetPassword">
      <h1>Forgot Password</h1> <br>
      <div id="forgetPasswordForm">
        <label for="email2"> Email: </label>
        <input type="email" id="email2" v-model="email" required="" placeholder="username@email.com"> <br><br>

        <div class="resetButton">
          <button type="submit" id="resetButton">Send Reset Link</button>
        </div>
      </div>
    </form>
    <div class="login-container">
      <button class="login-button" @click="navigateToLogin">Back to Login</button>
    </div>
  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '@/firebase.js';

export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async submitForgetPassword() {
      if (!this.email) {
        alert("Please enter your email.");
        return;
      }
      try {
        await sendPasswordResetEmail(getAuth(firebaseApp), this.email);
        alert("Password reset email sent! Check your inbox.");
        this.email = '';
      } catch (error) {
        alert("Failed to send password reset email: " + error.message);
      }
    },
  },
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

#forgetPasswordContainer {
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

#forgetPasswordForm {
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

.resetButton {
  text-align: center;
}

#resetButton {
  font-size: 14px;
}

#resetButton:hover {
  background-color: #f8961f; /* New color for hover */
  transform: scale(1.1); /* Increases size by 10% */
}

.login-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.login-button {
  background: none;
  border: none;
  color:#578855;
  padding: 0;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: underline;
  font-family: 'Fuzzy Bubbles';
  font-size: 14px;
}

.login-button:hover {
  font-weight: bold;
  color:#FFB356;
}

</style>
