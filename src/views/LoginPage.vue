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
        
        <div class="password-wrapper">
          <label for="password1"> Password: </label>
          <input :type="showPassword ? 'text' : 'password'" id="password1" v-model="password" required placeholder="***********">
          <button type="button" @click="showPassword = !showPassword">
            <img id="PasswordEyeIcon" src="/password-eye.png" alt="Toggle password visibility"><br><br>
          </button>
        </div> <br>
        
        <div class="loginButton">
          <button id="loginButton" type="submit"> Login </button>
        </div> <br><br>
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
    <button id="googleLoginButton" @click="googleLogin">Sign in with Google</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '@/firebase.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    };
  },
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
      const auth = getAuth();

      alert("Logging In...");

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("You have successfully Logged In!");
        this.$router.push({ name: 'Home' });
      } catch (error) {
        const errorMessage = error.message;
        if (errorMessage.includes("auth/invalid-email") || errorMessage.includes("auth/invalid-credential")) {
          alert("Please enter a valid email/password");
        } else { 
          alert("Error: " + errorMessage);
        }
      }
      
    },
    async googleLogin() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (result._tokenResponse.isNewUser) {
          // Prompt for username creation
          this.$router.push({ name: 'UsernameCreation'});
        } else {
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        if (!error.message.includes("auth/popup-closed-by-user")) {
          alert(error.message);
        } else {
          console.log("Pop-up closed by user")
        }
      }
    },
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
  margin-top: 50px;
}

#PasswordEyeIcon {
  width: 30px;
  margin-bottom: -20px;
}

h1 {
  font-weight: bold;
}

form {
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

input[type="email"]::placeholder, input[type="password"]::placeholder {
  font-family: 'Fuzzy Bubbles';
  font-size: 15px;
}

input:hover {
  transform: scale(1.02);
}

.password-wrapper {
  position: relative;
  align-items: center;
}

.password-wrapper button {
  position: absolute;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 0px;
  padding-top: 0px;  
}

.password-wrapper button:hover {
  transform: scale(1.1);
}

.loginButton {
  text-align: center;
}

#loginButton:hover, #googleLoginButton:hover {
  background-color: #f8961f; 
  transform: scale(1.1); 
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
