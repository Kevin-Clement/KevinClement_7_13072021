<template>
<div class="wall">
    <navigation/>
    <div class="wall-right">
      <div class="title-wall">
        <img class="whiteLogo" src="../assets/icon-left-font-monochrome-white.png" alt="logo groupomania blanc"/>
        <h2>Acceuil</h2>
        <hr>
      </div>
      <create-post/>
    <hr>
      <all-post/>
    </div>
</div>
</template>

<script>
import navigation from "../components/Nav.vue";
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

    };
  },
  mounted() {
    
  },
  methods: {

  },
};
</script>

<style scoped>
.wall{
  display: flex;
  background-color: #2e466e;
}
.title-wall{
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.wall-right{
  width:100%;
  border-left: 10px solid #f1f1f1;
}
.whiteLogo{
    width: 250px;
    height: 57px;
    margin: 10px 50px;
}
h2{
  font-family: 'roboto', sans-serif;
  font-size: 2rem;
  color: #f1f1f1;
  margin-top: 10px;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: 50px;
}
hr {
    border: none;
    border-top: 10px solid #f1f1f1;
    overflow: visible;
    height: 5px;
}

@media screen and (max-width:550px) {
  .wall{
    display: block
  }
  .wall-right{
    border-left: 0px;
  }
}

</style>