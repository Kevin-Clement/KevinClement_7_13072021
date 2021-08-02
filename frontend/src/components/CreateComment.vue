<template>
    <div>
        <form method="post" @submit.prevent="buttonCreateComment">
        <div>
            <label for="comment"></label>
            <input
            type="text"
            id="comment"
            placeholder="Commentaire"
            v-model="comment"
            />
        </div>
        <button type="submit" @click.prevent="buttonCreateComment">
            Envoyer <i class="far fa-comments"></i>
        </button>
        </form>
        <div class="error" v-if="error">
        {{ error.error }}
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "CreateComment",
    props: {
        id: Number,
    },
    data() {
        return {
            comment: "",
            error: "",
        };
    },
    methods: {
        buttonCreateComment() {
        const data = {
            comment: this.comment,
        };
        let token = localStorage.getItem("token");
        axios
            .post(
            "http://localhost:3001/api/post/" + this.id + "/comment/",
            data,
            {
                headers: { Authorization: "Bearer " + token },
            }
            )
            .then((res) => {
            console.log(res);
            document.location.reload();
            })
            .catch((error) => {
            this.error = error.response.data;
            });
        },
    },
};
</script>

<style scoped>
input {
    border: solid rgb(206, 206, 206) 1px;
    text-decoration: none;
    box-shadow: 10px 5px 9px #67708469;
    margin-bottom: 20px;
}
input::placeholder{
    color: #fff;
}
form{
    display: flex;
    flex-direction: column;
}
#comment{
    display: flex;
    justify-content: center;
    background-color: #6481b3;
    border-radius: 20px;
    width: 80%;
    padding: 20px;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 15px;
    margin-bottom: 5px;
}
button {
    background-color: #192a48;
    color: white;
    padding: 6px;
    margin-bottom: 10px;
    border: none;
    text-decoration: none;
}
.error {
    font-size: 11px;
    background-color: rgb(231, 185, 185);
    color: rgb(53, 21, 21);
    padding: 10px;
}
</style>