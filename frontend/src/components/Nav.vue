<template>
    <div class="navigation">
        <nav id="nav" >
            <ul class="links">
                <li><router-link to="/wall"> <i class="fas fa-home"></i>Accueil</router-link></li>
                <li><router-link :to="`/profile/${userId}`"><i class="fas fa-user"></i> Profil</router-link></li>
                <li><a to="/login" v-on:click="Logout()"> Déconnexion</a></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: "wall",
    data() {
        return {
        token: "",
        userId: "",
        };
    },
    mounted() {
        this.userId = localStorage.getItem("id");
    },
    methods: {
        Logout() {
        localStorage.clear();
        this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.navigation{
    background-color: #406097;
    box-shadow:inset 0px 0px 15px 3px #23395e;
}

.links{
    position: fixed;
}
nav{
    width: 125px;
    padding: 100px 40px;
}
nav a{
    outline: none;
    text-decoration: none;
    color: #f1f1f1;
    cursor: pointer;
}
nav li{
    color:#f1f1f1;
    list-style: none;
    margin: 10px 0;
    padding: 10px 12px;
    text-decoration: none;
    font-family: 'roboto', sans-serif;
    transition: .3s ease-in-out;
}

li:hover{
    background-color: #2e466e;
    border-radius: 20px;
}
.fas{
    padding-right: 10px;
}
@media screen and (max-width:550px) {
    .links{
        position:inherit;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        text-align: center;
        margin: 30px;
    }
    nav{
        display: flex;
        flex-direction: row;
        border-right: 0px ;
        padding: 0;
    }
}
</style>