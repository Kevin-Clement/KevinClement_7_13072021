<template>
<div>
  <button class="btn-commentToggle" @click="commentToggle = !commentToggle">Commentaire</button>
    <div id="oneComment" :class="{ active: commentToggle }">
        <div id="comment-card" v-for="comment in allComments" :key="comment.id">
          <div class="btn-deleteCom" v-if="comment.userId == userId || users.isAdmin == 1">
            <deleteComment :idCom="comment.id" :id="id" />
          </div>
            <div class="content">
            <i class="user-name"
                >{{ comment.User.username }}</i
            ><br />
            <hr>
            <strong>{{ comment.comment }}</strong><br />
            <i class="date">{{ moment(comment.createdAt).fromNow() }}</i>
            </div>
        </div>
        </div>
</div>
</template>


<script>
let moment = require("moment");
import deleteComment from "./DeleteComment.vue"
import axios from "axios";
export default {
  name: "allComments",
  components: {
    deleteComment,
  },
  props: {
    id: Number,
    },
  data() {
    return {
      commentToggle: false,
      moment: moment,
      isAdmin: localStorage.getItem("isAdmin"),
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("id"),
      allComments: [],
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
                console.log(this.users);
                })
                .catch((error) => {
                console.log("Le post n'a pas pu être récupéré /" + error);
                });
            },
  methods: {
    loadComments() {
      axios
        .get("http://localhost:3001/api/post/" + this.id + "/comments/", {
          headers: { Authorization: "Bearer " + this.token },
        })
        .then((res) => {
          
          this.allComments = res.data;
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.loadComments();
  },
};
</script>

<style scoped>
#oneComment {
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
#oneComment.active{
  display: flex;
}
.btn-commentToggle{
    font-size: 11px;
    padding: 5px 9px;
    border-radius: 5px;
    font-weight: bold;
    border: none;
    text-decoration: none;
    margin-bottom: 10px;
    background-color: #fff;
    color: #406097;
    cursor: pointer;
    margin-left: 25px;
    margin-bottom: 20px;
}
.btn-deleteCom{
  display: flex;
  justify-content: flex-end;
}
#comment-card {
  background-color: #406097;
  color: white;
  font-size: 15px;
  width: 80%;
  border: solid 2px;
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 15px;
  text-align: left;
}
.user-name {
  font-size: 11px;
}
hr {
    border: none;
    border-top: 1px solid #f1f1f1;
    overflow: visible;
    margin-bottom: 10px;
}
.date {
  font-size: 12px;
}
.comment {
  font-size: 20px;
}
.createdAt {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 15px;
}
.commentaire {
  margin: 15px;
}

@media screen and (max-width: 400px) {
  .btn-commentToggle{
    left: 64%;
}
}
</style>