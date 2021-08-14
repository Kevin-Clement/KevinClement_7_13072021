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
            <span class="btn-submitCom">Envoyer</span> <i class="far fa-comments"></i>
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
            token: localStorage.getItem("token"),
            comment: "",
            error: "",
        };
    },
    methods: {
        buttonCreateComment() {
            if(this.comment !== "") {
                const data = {
                    comment: this.comment,
                };
                axios
                    .post(
                    "http://localhost:3001/api/post/" + this.id + "/comment/",
                    data,
                    {
                        headers: { Authorization: "Bearer " + this.token },
                    }
                    )
                    .then((res) => {
                    console.log(res);
                    document.location.reload();
                    })
                    .catch((error) => {
                    this.error = error.response.data;
                    });
            }else{
            alert("Publiez un commentaire !")
            }
        }
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
    color: #fff;
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
    width: 20%;
    font-size: 14px;
    font-weight: bold;
    padding: 5px 9px;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #fff;
    color: #406097;
    cursor: pointer;
    position: relative;
    left: 70%;
}
.error {
    font-size: 11px;
    background-color: rgb(231, 185, 185);
    color: rgb(53, 21, 21);
    padding: 10px;
}

@media screen and (max-width: 400px) {
    #comment{
    width: 65%;
}
    .btn-submitCom{
        display: none;
    }
    button {
    width: 15%;
}
}
</style>