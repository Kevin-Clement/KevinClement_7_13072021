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
              <button class="deletebtn" type="submit" @click.prevent="deleteProfile">Supprimer mon compte</button>
            </div>
              <router-link :to="`/wall`"><i class="fas fa-arrow-left"></i></router-link>
            <h3 class="username">{{ users.username }}</h3>
            <!-- <img
              :src="users.file"
              :alt="users.file"
              v-if="users.file != null"
              />
            <label for="File">Photo de profil : </label>
                            <input  @change="updateImg()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png"> -->
            <div class="setting">
              <p><u>E-mail</u> : {{ users.email }}</p>
              <p><u>Nom d'utilisateur</u> : {{ users.username }}</p>
              <p><u>Mot de passe</u> : Doit contenir au minimum 8 caractères dont une majuscule,
              et au minimum un caractère numérique et un caractère spécial</p>
            </div>
                <button v-on:click="toggleModaleEditPwd" class="btn-update-pwd">Modifier le mot de passe</button>
          </div>
          <modaleEditPwd v-bind:reveleEditPwd="reveleEditPwd" v-bind:toggleModaleEditPwd="toggleModaleEditPwd"/>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import navigation from "../components/Nav2.vue";
import modaleEditPwd from "../views/ModaleEditPwd.vue"

export default {
    name: "profile",
    components:{
      navigation,
      modaleEditPwd,
    },
    data() {
        return {
          reveleEditPwd: false,
          token:"",
          users: [],
          userId: "",
          email: "",
          username: "",
          file: null,
          isAdmin: 0,
        };
    },
    methods: {
        loadProfile() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .get("http://localhost:3001/api/user/" + userId , {
                headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                this.users = res.data;
                console.log(res.data);
                })
                .catch((error) => {
                console.log("Le post n'a pas pu être récupéré /" + error);
                });
            },
        
        deleteProfile() {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("id");
            axios
                .delete("http://localhost:3001/api/user/" + userId , {
                headers: { Authorization: "Bearer " + token },
                })
                .then(() => {
                alert("Votre compte a été supprimé !");
                this.$router.push("/");
                })
                .catch((error) => {
                console.log({ error });
                });
            },
        toggleModaleEditPwd: function() {
          this.reveleEditPwd = !this.reveleEditPwd
        },
        // updateImg() {
        //   let userId = localStorage.getItem("id");
        //   this.file = this.$refs.file.files[0];
        //   axios
        //     .get("http://localhost:3001/api/user/" + userId, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
        //         .then(()=> {
        //             this.file = null
        //         })
        //         .catch((error)=>{
        //             console.log(error);
        //         })
        // }
        },
        mounted() {
            this.loadProfile();
            this.userId = localStorage.getItem("id");
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
  max-width: 800px;
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
.deletebtn {
  background-color: #182438;
  box-shadow:inset 0px 0px 8px 2px #375383;
    border-radius:17px;
    border: 1px solid #dadada;
    display:inline-block;
    cursor:pointer;
    color: #f1f1f1;
    font-family: 'roboto', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 18px;
    text-decoration: none;
    transition: .2s ease-in-out;
}
.deletebtn:hover{
  box-shadow:inset 0px 0px 8px 2px #b3b3b3;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin-top: 30px;
  padding: 10px;
}

@media screen and (max-width:550px) {
  .profile-right{
    border-left: 0px;
  }
}
</style>