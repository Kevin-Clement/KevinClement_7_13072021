<template>
    <div class="editPwd" v-if="reveleEditPwd">
        <div v-on:click="toggleModaleEditPwd" class="overlayEditPwd"></div>
        <div class="modale-editPwd">
            <button v-on:click="toggleModaleEditPwd" class="btn-close-modale"><i class="fas fa-arrow-left"></i></button>
            <img class="blackLogo" src="../assets/blackLogo.png" alt="logo groupomania"/>
            <h1>Modifier votre mot de passe</h1>

            <form class="formulaire" method="post" @submit.prevent="sendEditPwd">
            <div>
                <label for="email"></label>
                <input type="email" 
                placeholder="email@exemple.com" 
                v-model="email"
                id="email" />
            </div>
            <div>
                <label for="password"></label>
                <input
                type="password"
                placeholder="Nouveau mot de passe"
                v-model="changePwd.newPassword"
                />
            </div>
            <div>
                <label for="password"></label>
                <input
                type="password"
                placeholder="Répétez le mot de passe"
                v-model="changePwd.RepeatNewPassword"
                />
            </div>
            <button class="btn-editPwd" @click.prevent="sendEditPwd" type="submit">Modifier</button>
            </form>
            <div class="error" v-if="error">
            {{ error.error }}
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";
export default {
    name: "signup",
    props: ['reveleEditPwd','toggleModaleEditPwd'],
    data() {
        return {
            email: '',
            error: '',
            changePwd: {
                newPassword: null,
                RepeatNewPassword: null
            }
        };
    },
    methods: {
    async sendEditPwd() {
        if (
        this.changePwd.newPassword == this.changePwd.RepeatNewPassword &&
        this.changePwd.newPassword != "" &&
        this.changePwd.RepeatNewPassword != "") {
            let userId = localStorage.getItem("id");
            const data = {
                email: this.email,
                newPassword: this.changePwd.newPassword,
                error: this.error
            };
            await axios
                .put("http://localhost:3001/api/user/" + userId, data, 
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                .then((res) => {
                console.log(res);
                window.location.reload();
                })
                .catch((error) => {
                this.error = error.response.data;
                console.log(error.response.data);
                });
        } else {
        alert("Veuillez vérifier la saisie des mots de passe, ils ne sont pas identiques");
        }
        }
    }
};
</script>

<style scoped>
.editPwd{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modale-editPwd{
    background-color: #f1f1f1;
    padding: 30px;
    border-radius: 10px;
    z-index: 1;
    box-shadow: inset 0 0 10px;
    position: relative;
    top: 10px;
}
.btn-close-modale{
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
    padding: 5px 10px;
	text-decoration:none;
    border: none;
	text-shadow:0px 1px 0px #854629;
    position: relative;
    right: 20px;
    bottom: 20px;
    color: #2e466e;
    font-weight: bold;
    font-size: 20px;
}

.overlayEditPwd{
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.formulaire {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.blackLogo{
    height: 42px;
    width: 35px;
    position: relative;
    left: 126px;
    bottom: 10px;
}
h1{
    font-size: 1.5rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 30px;
    font-family: 'roboto', arial, sans-serif;
    color: #2e466e;
    font-weight: 900;
}
input {
    width: 100%;
    padding: 10px 20px;
    font-size: 16px;
    color: #2e466e;
    margin-bottom: 30px;
    border: none;
    border-bottom: 2px solid #2e466e;
    outline: none;
    background: transparent;
}
.btn-editPwd {
    box-shadow:inset 0px 0px 15px 3px #23395e;
	background:linear-gradient(to bottom, #2e466e 5%, #415989 100%);
	background-color:#2e466e;
	border-radius:17px;
	border:1px solid #1f2f47;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	padding:10px 18px;
	text-decoration:none;
	text-shadow:0px 1px 0px #263666;
    margin-top: 20px;
}
.btn-editPwd:hover {
	background:linear-gradient(to bottom, #415989 5%, #2e466e 100%);
	background-color:#415989;
}
.btn-editPwd:active{
    position:relative;
	top:1px;
}
.error {
    font-size: 13px;
    background-color: rgb(231, 185, 185);
    color: rgb(53, 21, 21);
    margin-top: 30px;
    padding: 10px;
}
</style>