<template>
    <div class="post">
        <form method="post" @submit.prevent="buttonNewMessage">
        <h2>Publiez votre message<i class="far fa-paper-plane"></i></h2>
        <div>
            <label for="content"></label>
            <textarea
            type="text"
            id="content"
            placeholder="Votre message !"
            rows="5"
            cols="33"
            v-model="content"
            />
        </div>
        <div>
            <label for="File">(Facultatif)</label><br />
            <input type="file" ref="file" @change="selectFile()" />
        </div>
        <button class="btn-post" type="submit" @click.prevent="buttonNewMessage">Publier</button>
        <div class="error" v-if="error">
            {{ error.error }}
        </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "createPost",
    data() {
        return {
        content: "",
        file: null,
        error: "",
        };
    },
    methods: {
        buttonNewMessage() {
        let token = localStorage.getItem("token");
        const data = new FormData();
        if(this.content !== ""){
            if (this.file !== null) {
                data.append("content", this.content);
                data.append("image", this.file, this.file.name);
            } else {
                data.append("content", this.content);
            }
            axios
                .post("http://localhost:3001/api/post/", data, {
                headers: { Authorization: "Bearer " + token },
                })
                .then(() => {
                alert("Votre message a bien été envoyé !");
                document.location.reload();
                this.$router.push("/wall");
                })
                .catch((error) => {
                this.error = error.response.data;
                });
        }
        else{
            alert("Publiez un message !")
            }
        },
        selectFile() {
        this.file = this.$refs.file.files[0];
        },
    },
};
</script>

<style scoped>
.post {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.post h2{
    margin-bottom: 20px;
}
form {
    width: 65%;
    padding: 10px;
    color: white;
    margin: 20px 0;
    text-align: center;
    position: relative;
    right: 3%;
}

textarea {
    outline: none;
    box-shadow:inset 0px 0px 15px 3px #23395e;
    font-size: 1.3rem;
    padding: 30px;
    color: #f1f1f1;
    border: none;
    background-color: #4669a5;
    width: 100%;
    margin-bottom: 10px;
    height: 100px;
    border-radius: 20px;
}
textarea::placeholder {
    padding: 3px;
    font-size: 1.3rem;
    color: #cacaca;
    background-color: #30476e;
    width: 150px;
    height: 30px;
    border-radius: 10px;
}
label {
    font-size: 12px;
}
input {
    border: solid rgb(206, 206, 206) 1px;
    text-decoration: none;
    margin-bottom: 20px;
    width: 50%;
}
.btn-post {
    box-shadow:inset 0px 0px 15px 3px #ffffff;
    background-color: #f1f1f1;
    border-radius:17px;
    border: 1px solid #dadada;
    display:inline-block;
    cursor:pointer;
    color: #2e466e;
    font-family: 'roboto', sans-serif;
    font-size: 15px;
    padding: 10px 18px;
    text-decoration: none;
    margin: 10px 10px;
    transition: .2s ease-in-out;
}
.btn-post:hover{
    box-shadow:inset 0px 0px 8px 2px #b3b3b3;
}
.error {
    font-size: 13px;
    background-color: rgb(231, 185, 185);
    color: rgb(53, 21, 21);
    margin: 20px;
    padding: 10px;
}

@media screen and (max-width:500px) {
    form{
        width: 80%;
        padding: 10px;
        color: white;
        margin: 20px auto;
        text-align: center;
    }
    textarea{
        padding:10px;
        font-size: 1rem;
    }
    textarea::placeholder{
        font-size: 1rem;
        width: 120px;
        height: 20px;
    }
}
</style>