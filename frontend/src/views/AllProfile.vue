<template>
    <div class="allProfile" v-if="users.isAdmin == 1">
        <div class="allProfile-right">
            <div>
                <hr>
                <div class="title-wall">
                <h2>Listes des utilisateurs</h2>
                <hr>
                </div>
            </div>
            <div class="allProfile-wall" v-for="profile in allProfiles" :key="profile.id">
                <div class="setting">
                <p><u>Nom d'utilisateur</u> : {{ profile.username }}</p>
                <p><u>E-mail</u> : {{ profile.email }}</p>
                </div>
        <hr>
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "allProfile",
    data() {
        return {
            allProfiles: [],
            users: [],
            email: "",
            username: "",
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("id"),
            isAdmin: localStorage.getItem("isAdmin"),
        };
    },
    async created() {
    await 
            axios
                .get("http://localhost:3001/api/user/" + this.userId , {
                headers: { Authorization: "Bearer " + this.token },
                })
                .then((res) => {
                this.users = res.data;
                console.log(this.users.id);
                })
                .catch((error) => {
                console.log("Le post n'a pas pu être récupéré /" + error);
                });
            },
    methods: {
        loadAllProfiles() {
            axios
                .get("http://localhost:3001/api/user/", {
                headers: { Authorization: "Bearer " + this.token },
                })
                .then((res) => {
                this.allProfiles = res.data
                })
                .catch((error) => {
                console.log("Les utilisateurs n'ont pas pu être récupérés /" + error);
                });
            },
    },
    mounted() {
    this.loadAllProfiles();
    },
}
</script>

<style scoped>
.allprofile{
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.allprofile-right{
  width: 100%;
  border-left: 10px solid #f1f1f1;
  position: relative;
  left: 80px;
}

h2{
  font-family: 'roboto', sans-serif;
  font-size: 2rem;
  color: #f1f1f1;
  margin : 30px;
}
hr {
    border: none;
    border-top: 10px solid #f1f1f1;
    overflow: visible;
    height: 5px;
}
.allprofile-wall{
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
    display: flex;
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
hr {
    border: none;
    border-top: 3px solid #f1f1f1;
    overflow: visible;
    height: 5px;
}
@media screen and (max-width:450px) {
  h2{
  font-size: 1.3rem;
}
.setting{
    display: flex;
    max-width: 280px;
    flex-wrap: wrap;
}
}

</style>
