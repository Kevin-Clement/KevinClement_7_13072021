<template>
    <div class="profile">
        <navigation/>
        <div class="profile-right">
          <div>
            <div class="title-wall">
              <img class="whiteLogo" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania blanc"/>
              <h2>Profil</h2>
              <hr>
            </div>
          </div>
          <div class="profile-wall">
            <div class="header-profile-wall">
              <h3 class="logo-setting"><i class="fas fa-cog"></i>Paramètres du compte</h3>
            </div>
            <router-link :to="`/wall`"><i class="fas fa-arrow-left"></i></router-link>
            <h3 class="username">{{ users.username }}</h3>
            <div class="setting">
              <p><u>E-mail</u> : {{ users.email }}</p>
              <p><u>Nom d'utilisateur</u> : {{ users.username }}</p>
              <p><u>Mot de passe</u> : Doit contenir au minimum 8 caractères dont une majuscule,
              et au minimum un caractère numérique et un caractère spécial</p>
            </div>
            <div class="btn-profile">
                <button v-on:click="toggleModaleEditPwd" class="btn-update-pwd">Modifier le mot de passe</button>
                <deleteProfile/>
            </div>
          </div>
          <allProfiles/>
          <modaleEditPwd v-bind:reveleEditPwd="reveleEditPwd" v-bind:toggleModaleEditPwd="toggleModaleEditPwd"/>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import navigation from "../components/Nav2.vue";
import modaleEditPwd from "../views/ModaleEditPwd.vue";
import deleteProfile from "../components/DelProfile.vue";
import allProfiles from "../views/AllProfile.vue"

export default {
    name: "profile",
    components:{
      navigation,
      modaleEditPwd,
      deleteProfile,
      allProfiles,
    },
    data() {
        return {
          reveleEditPwd: false,
          users: [],
          token: localStorage.getItem("token"),
          userId: localStorage.getItem("id"),
          email: "",
          username: "",
          file: null,
          isAdmin: 0,
        };
    },
    methods: {
        loadProfile() {
            axios
                .get("http://localhost:3001/api/user/" + this.userId , {
                  headers: { Authorization: "Bearer " + this.token },
                })
                .then((res) => {
                  this.users = res.data;
                  console.log(res.data);
                })
                .catch((error) => {
                  console.log("Le post n'a pas pu être récupéré /" + error);
                });
            },
        toggleModaleEditPwd: function() {
            this.reveleEditPwd = !this.reveleEditPwd
        },
        },
        mounted() {
            this.loadProfile();
        },
    
}
</script>

<style scoped>
.profile{
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.profile-right{
  width: 100%;
  border-left: 10px solid #f1f1f1;
  position: relative;
  left: 80px;
}
.whiteLogo{
    width: 250px;
    height: 57px;
    margin: 20px 50px;
}
h2{
  font-family: 'roboto', sans-serif;
  font-size: 2rem;
  color: #f1f1f1;
  margin-bottom: 30px;
  margin-left: 50px;
}
hr {
  border: none;
  border-top: 10px solid #f1f1f1;
  overflow: visible;
  height: 5px;
}
.profile-wall{
  margin: 30px
}
.title-wall{
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.fas{
  background: none;
  color: #f1f1f1
}
.fa-cog{
  margin-right: 20px;
}
.header-profile-wall{
  display: flex;
}
.fa-arrow-left{
  font-size: 28px;
  position: relative;
  top: 33px;
  left: 20px;
}
.logo-setting{
  margin-bottom: 10px;
}
.setting{
  width: 77%;
}
h3{
  margin: 0 60px;
  color: #f1f1f1;
  font-size: 2rem;
}
.username{
  margin-bottom: 40px;
}
p{
  color: #f1f1f1;
  padding:20px;
  border: 1px solid #42639c;
}
.btn-update-pwd {
  box-shadow:inset 0px 0px 15px 3px #ffffff;
  background-color: #ebe9e9;
  border-radius:17px;
  border: 1px solid #dadada;
  display:inline-block;
  cursor:pointer;
  color: #2e466e;
  font-family: 'roboto', sans-serif;
  font-size: 15px;
  padding: 10px 18px;
  text-decoration: none;
  margin: 20px 10px;
  transition: .2s ease-in-out;
}
.btn-update-pwd:hover{
  box-shadow:inset 0px 0px 8px 2px #b3b3b3;
}
.btn-profile{
  display: flex;
  align-items: center;
}

@media screen and (max-width:550px) {
  .profile-right{
    border-left: 0px;
  }
}

@media screen and (max-width:450px) {
  .whiteLogo{
    width: 200px;
    height: 45px;
    margin: 20px 35px;
  }
  .profile-wall{
    margin: 20px;
  }
  h2{
    font-size: 1.7rem;
  }
  h3{
    margin: 0;
    font-size: 1.3rem;
  }
  .fa-arrow-left{
    display: none;
  }
  .btn-profile{
    display: inherit;
    align-items: inherit;
  }
  .btn-update-pwd{
    font-size: inherit;
  }
}
</style>