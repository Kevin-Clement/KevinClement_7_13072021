<template>
    <div class="signup" v-if="reveleSignup">
        <div v-on:click="toggleModaleSignup" class="overlaySignup"></div>
        <div class="modale-signup">
            <button v-on:click="toggleModaleSignup" class="btn-close-modale"><i class="fas fa-arrow-left"></i></button>
            <img class="blackLogo" src="../assets/blackLogo.png" alt="logo groupomania"/>
            <h1>Inscription</h1>
            <form class="formulaire" method="post" @submit.prevent="sendSignup">
                <div>
                    <label for="email"></label>
                    <input type="email" 
                    placeholder="email@exemple.com" 
                    v-model="email" />
                </div>
                <div>
                    <label for="username"></label>
                    <input
                    type="text"
                    id="prénom"
                    placeholder="Nom d'utilisateur"
                    v-model="username"/>
                </div>
                <div>
                    <label for="password"></label>
                    <input
                    type="password"
                    placeholder="Votre mot de passe"
                    v-model="password"
                    />
                </div>
                <button class="btn-signup" @click.prevent="sendSignup" type="submit">S'inscrire</button>
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
    props: ['reveleSignup','toggleModaleSignup'],
    data() {
        return {
            email: '',
            username: '',
            password: '',
            error: '',
        };
    },
    methods: {
    async sendSignup() {
        const data = {
            email: this.email,
            username: this.username,
            password: this.password,
            error: this.error
        };
        await axios
            .post("http://localhost:3001/api/user/signup", data)
            .then((res) => {
                console.log(res);
                document.location.reload();
            })
            .catch((error) => {
                this.error = error.response.data;
                console.log(error.response.data);
            });
        },
    },
};
</script>

<style scoped>
.signup{
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
.modale-signup{
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
.overlaySignup{
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
    left: 55px;
    bottom: 10px;
}
h1{
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 30px;
    font-family: 'roboto', arial, sans-serif;
    color: #2e466e;
    font-weight: 900;
}
input {
    padding: 10px 20px;
    font-size: 16px;
    color: #2e466e;
    margin-bottom: 30px;
    border: none;
    border-bottom: 2px solid #2e466e;
    outline: none;
    background: transparent;
}
.btn-signup {
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
.btn-signup:hover {
	background:linear-gradient(to bottom, #415989 5%, #2e466e 100%);
	background-color:#415989;
}
.btn-signup:active{
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