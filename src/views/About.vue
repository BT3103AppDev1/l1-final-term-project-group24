<template>
    <NavBar />
    <br>
    <img id="FoodFolioLogo" src="/foodfolio_logo.png" alt="FoodFolio logo">
    <br>
    <h1 id="welcome-message"> Welcome to FoodFoilo, your all-in-one solution for easy grocery management and healthy eating. 
        With our user-friendly interface and powerful features, you can effortlessly track your groceries,
        plan your meals, and achieve your nutritional goals. Say goodbye to forgotten items at the store 
        and hello to a healthier, more organized lifestyle with FoodFolio!
    </h1>
    <br>
    <h1>
        Contact us at:
    </h1>
    <div id="contact-links">
        <a href="https://www.instagram.com/foodfolio_sg/" target="_blank" rel="noopener noreferrer">
            <img id="instagram-button" src="/instagram_icon.png" alt="FoodFolio Instagram">
        </a>
        <a href="mailto:foodfolio@gmail.com">
            <img id="mail-button" src="/mail_icon.png" alt="Email FoodFolio">
        </a>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
}
</script>


<style scoped>
#FoodFolioLogo {
    width: 290px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

#welcome-message {
    font-size: 20px;
    padding: 0 70px
}

#instagram-button {
    width: 200px;
    margin-left: 25px;
}

#mail-button {
    width: 260px;
    vertical-align: middle;
    margin-top: -108px;
}

#mail-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}
#instagram-button:hover {
    transform: scale(1.1);
    cursor: pointer;
}


</style>