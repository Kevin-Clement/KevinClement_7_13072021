<template>
<div>
  <div class="allPost">
    <div id="message-card" v-for="post in allPost" :key="post.id">
      <div class="btn-deletePost" v-if="post.userId == userId || users.isAdmin == 1">
        <deletePost :id="post.id"/>
      </div>
      <div class="content">
        <div class="createdAt">
          <i>Par : {{ post.User.username }}</i>
          <i>{{ moment(post.createdAt).fromNow() }}</i>
        </div>
        <img
          :src="post.attachement"
          :alt="post.attachement"
          v-if="post.attachement != null"/><br />
        <div class="content-post">
          <i>{{ post.content }}</i>
        </div>
      </div>
      <createComment :id="post.id"/>
      <allComments :id="post.id"/>
    </div>
  </div>
</div>
</template>

<script>

import axios from "axios";
import createComment from"./CreateComment.vue";
import allComments from "./AllComments.vue";
import deletePost from "./DelPost.vue";
let moment = require("moment");

export default {
  name: "allPost",
  components: {
    deletePost,
    createComment,
    allComments,
  },
  data() {
    return {
      moment: moment,
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("id"),
      isAdmin: localStorage.getItem("isAdmin"),
      users: [],
      allPost: [],
      content: "",
      createAt: "",
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
        })
        .catch((error) => {
          console.log("Le post n'a pas pu être récupéré /" + error);
        });
  },

  methods: {
    loadPost() {
      axios
        .get("http://localhost:3001/api/post/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          this.allPost = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },

  mounted() {
    this.loadPost();
  },
};

</script>

<style scoped>
.allPost {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  right: 50px;
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
.btn-deletePost{
  display: flex;
  justify-content: flex-end;
  margin: 5px;
}
#message-card {
  background-color: #192a48;
  box-shadow:0px 0px 15px 3px #23395e;
  color: white;
  width: 80%;
  max-width: 500px;
  border: solid 2px;
  margin: 15px;
  border-radius: 20px;
}
a {
  text-decoration: none;
  color: red;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #406097;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
  padding-bottom: 20px;
  font-size: 18px;
}
.content-post{
  background-color: #4668a2;
  border-radius: 20px;
  width: 100%;
  padding: 20px;
}
img {
  max-width: 500px;
  width: 90%;
  height: 90%;
}
.createdAt {
  background-color: #406097;
  font-size: 12px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px;
  border-bottom: 1px solid #fff;
  margin-bottom: 15px;
}
.one-message {
  background-color: #c46e78;
  color: white;
  padding: 9px;
  border-radius: 25px;
  font-size: 14px;
}
.adminDelete {
  margin: 30px;
}

@media screen and (max-width: 425px) {
  .allPost{
    right: 42px;
  }
  #message-card {
    width: 75%;
  }
}
</style>