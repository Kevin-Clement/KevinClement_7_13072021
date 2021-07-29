<template>
    <div>
        <nav id="nav">
        <ul class="links">
            <li>
            <router-link to="/wall">Retour</router-link>
            </li>
        </ul>
        </nav>
        <div>
        <h2>Profile</h2>
          <p>
              <u>E-mail</u>:
              {{ users.email }}
          </p>
          <p>
              <u>Pseudonyme</u>: {{ users.username }}
          </p>
          </div>
          <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
              Supprimer mon compte
          </button>
    </div>
</template>


<script>
import axios from "axios";
export default {
    name: "profile",
    data() {
        return {
          token:"",
          users: [],
          userId: "",
          email: "",
          username: "",
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
                alert("Votre compte est supprimé !");
                this.$router.push("/");
                })
                .catch((error) => {
                console.log({ error });
                });
            },
        },
        mounted() {
            this.loadProfile();
            this.userId = localStorage.getItem("id");
        },
}
</script>

<style scoped>
form {
  margin-top: 30px;
}
input {
  margin-bottom: 10px;
}
.deletebtn {
  background-color: rgb(255, 80, 80);
  margin-top: 20px;
  margin-bottom: 50px;
}
.my-messages {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding-bottom: 20px
}
img {
  width: 90px;
  height: 90px;
}
.my-message {
  background-color: #192a48;
  color: white;
  width: 20%;
  font-size: 12px;
  margin: 15px;
  padding: 10px;
}
.error {
  font-size: 13px;
  background-color: rgb(231, 185, 185);
  color: rgb(53, 21, 21);
  margin-top: 30px;
  padding: 10px;
}
</style>