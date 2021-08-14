<template>
<div class="wall">
    <navigation/>
    <div class="wall-right">
      <div class="title-wall">
        <img class="whiteLogo" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania blanc"/>
        <h2>Acceuil - {{ users.username }}</h2>
        <hr>
      </div>
      <create-post/>
    <hr>
      <all-post/>
    </div>
</div>
</template>

<script>
import axios from "axios";
import navigation from "../components/Nav2.vue";
import createPost from "../components/CreatePost.vue";
import allPost from "../components/AllPost.vue";

export default {
  name: "wall",
  components:{
    navigation,
    createPost,
    allPost,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("id"),
      users: [],
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
                console.log(res.data);
                })
                .catch((error) => {
                console.log("Le post n'a pas pu être récupéré /" + error);
                });
            },
};
</script>

<style scoped>
.wall{
  display: flex;
  background-color: #2e466e;
}
.title-wall{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.wall-right{
  width:100%;
  border-left: 10px solid #f1f1f1;
  position: relative;
  left: 80px;
}
.whiteLogo{
    width: 250px;
    height: 57px;
    margin: 10px 0px;
    margin-right: 65px;
}
h2{
  font-family: 'roboto', sans-serif;
  font-size: 2rem;
  color: #f1f1f1;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 50px;
}
hr {
    border: none;
    border-top: 10px solid #f1f1f1;
    overflow: visible;
    height: 5px;
    width: 100%;
}

@media screen and (max-width:550px) {
  .wall{
    display: block
  }
  .wall-right{
    border-left: 0px;
  }
}

@media screen and (max-width: 400px) {
    .whiteLogo{
    width: 180px;
    height: 38px;
}
h2{
    font-size: 1rem;
}
}

</style>