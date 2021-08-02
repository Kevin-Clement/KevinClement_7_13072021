<template>

    <div class="navigation" :class="{ active: menuToggle }" @click="menuToggle = !menuToggle">
            <ul class="links">
                <li class="list">
                    <router-link to="/wall">
                        <i class="fas fa-home"></i>
                        <span v-if="menuToggle" class="title">Accueil</span>
                    </router-link>
                </li>
                <li class="list">
                    <router-link :to="`/profile/${userId}`">
                        <i class="fas fa-user"></i>
                        <span v-if="menuToggle" class="title">Profil</span>
                    </router-link>
                </li>
                <li class="list">
                    <a to="/login" v-on:click="Logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        <span v-if="menuToggle" class="title">Deconnexion</span>
                    </a>
                </li>
            </ul>
        <div class="toggle" :class="{ active: isSelected }" @click="isSelected = !isSelected">
            <i class="fas fa-bars"></i>
            <i class="fas fa-times"></i>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav2',
    data() {
        return {
            menuToggle: false,
            isSelected: false,
            userId: "",
        }
    },
    methods: {
        Logout() {
        localStorage.clear();
        this.$router.push("/");
        },
    },
    mounted() {
        this.userId = localStorage.getItem("id");
    },
}

</script>

<style scoped>
.navigation{
    position: fixed;
    top: 80px;
    bottom: 20px;
    width: 74px;
    border-radius: 10px;
    background-color: #23395e;
    box-shadow:inset 0px 0px 20px 6px #2e466e;
    transition: 0.2s;
    z-index: 9999;
    padding-left: 5px;
}
.navigation.active{
    width: 250px;
} 

.navigation ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 5px;
    padding-top: 40px;
}
.navigation ul li{
    position: relative;
    list-style: none;
    width: 80%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    cursor: pointer;
    margin: 10px 0;
}
.navigation ul li:hover{
    background-color: #2e466e;
    border-radius: 20px;
}
.navigation ul li a{
    position: relative;
    display: block;
    width: 100%;
    display: flex;
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
}

.navigation ul li a .fas{
    position: relative;
    display: block;
    min-width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 1.5em;
}
.navigation ul li a .title{
    position: relative;
    display: block;
    padding-left: 10px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    white-space: normal;
}
.toggle{
    position: fixed;
    top : 20px;
    left: 15px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.toggle .fas{
    position: absolute;
    color: #2e466e; 
    font-size: 34px;
    display: block;
}
.toggle .fa-bars,
.toggle.active .fa-times{
    display: block;
}
.toggle .fa-times,
.toggle.active .fa-bars{
    display: none;
}
</style>