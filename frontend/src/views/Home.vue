<template>
  <div class="home">
    <video muted loop autoplay>
      <source src="../assets/newyork.mp4" type="video/mp4">
    </video>
    <div class="logo">
      <img src="" alt="">
    </div>
    <div class="home-content">
      <h1>GROUPOMANIA</h1>
      <p>SOCIAL NETWORK EXPERIENCE</p>
      <div class="middle-line"></div>
      <div class="btn-home">
        <button v-on:click="toggleModaleSignup" class="btn-home-signup">S'enregistrer</button>
        <button v-on:click="toggleModaleLogin" class="btn-home-login">Se connecter</button>
      </div>
    </div>
    <signup v-bind:reveleSignup="reveleSignup" v-bind:toggleModaleSignup="toggleModaleSignup"/>
    <login v-bind:reveleLogin="reveleLogin" v-bind:toggleModaleLogin="toggleModaleLogin"/>
  </div>
</template>

<script>
import login from './Login.vue'
import signup from './Signup.vue'

export default {
  name: "Home",
  components: {
    'login': login,
    'signup': signup
  },
  data(){
    return {
      reveleSignup: false,
      reveleLogin: false,
    }
  },
  methods:{
    toggleModaleSignup: function() {
      this.reveleSignup = !this.reveleSignup
    },
    toggleModaleLogin: function() {
      this.reveleLogin = !this.reveleLogin
    }
  }
};
</script>

<style scoped>

.home {
    height: 100vh;
    position: relative;
}
video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.home-content {
    position: relative;
    padding-top: 150px;
    color: #fff;
    text-align: center;
    bottom: 6%;
}
h1 {
    font-family: Playfair Display, serif;
    font-size: clamp(45px, 7vw, 130px);
    line-height: 1.1;
}
.home p {
    font-size: clamp(25px, 4vw, 40px);
    margin-top: 10px;
}
.middle-line {
    height: 250px;
    width: 2px;
    background: #fff;
    margin: 40px auto;
    position: relative;
}
.home-content button {
    display: block;
    font-size: clamp(14px, 1.5vw, 18px);
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    margin: 50px auto 0;
    padding: 12px 20px;
    cursor: pointer;
    transition: .3s ease-in-out;
}
button:hover{
    color: black;
    background-color: #fff;
}

@media screen and (max-width:1400px) {
  .middle-line {
    height: 150px;
  }
}
</style>