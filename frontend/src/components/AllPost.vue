<template>
  <div class="allPost">
    <div id="message-card" v-for="post in allPost" :key="post.id">
      <div class="content">
        <img
          :src="post.attachement"
          :alt="post.attachement"
          v-if="post.attachement != null"
        /><br />
        {{ post.content }}
      </div>
      <div class="createdAt">
        <i>{{ moment(post.createdAt).fromNow() }}</i>
        <i>{{ post.User.username }}</i>
      </div>
      <deletePost :id="post.id" />
    </div>
  </div>
</template>

<script>

import axios from "axios";
import deletePost from "./deletePost.vue";
let moment = require("moment");

export default {
  name: "allPost",
  components: {
    deletePost,
  },
  data() {
    return {
      moment: moment,
      token: "",
      userId: localStorage.getItem("id"),
      isAdmin: "",
      allPost: [],
      content: "",
      createAt: "",
    };
  },
  methods: {
    loadPost() {
      let token = localStorage.getItem("token");
      axios
        .get("http://localhost:3001/api/post/", {
          headers: { Authorization: "Bearer " + token },
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
  background-color: #406097;
  box-shadow:inset 0px 0px 15px 3px #23395e;
}
#message-card {
  background-color: #192a48;
  color: white;
  width: 80%;
  max-width: 500px;
  border: solid 2px;
  margin: 15px;
}
a {
  text-decoration: none;
  color: red;
}
.content {
  padding: 30px;
    font-size: 18px;
    padding-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
img {
  max-width: 500px;
  width: 90%;
  height: 90%;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
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
</style>