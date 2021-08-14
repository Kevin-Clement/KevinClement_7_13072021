<template>
    <div>
        <button class="deletebtn" type="submit" @click.prevent="deleteProfile">Supprimer mon compte</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"delProfile",
    data(){
        return{
            token: localStorage.getItem("token"),
            userId: localStorage.getItem("id"),
        }
    },
    methods: {
        deleteProfile() {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce compte ?')) {
            axios
                .delete("http://localhost:3001/api/user/" + this.userId , {
                    headers: { Authorization: "Bearer " + this.token },
                })
                .then(() => {
                    alert("Votre compte a été supprimé !");
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.log({ error });
                });
            }
        },
    }
}
</script>

<style scoped>
.deletebtn {
    background-color: #182438;
    box-shadow:inset 0px 0px 8px 2px #375383;
    border-radius:17px;
    border: 1px solid #dadada;
    display:inline-block;
    cursor:pointer;
    color: #f1f1f1;
    font-family: 'roboto', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 18px;
    text-decoration: none;
    margin: 5px 50px;
    transition: .2s ease-in-out;
}
.deletebtn:hover{
    box-shadow:inset 0px 0px 8px 2px #b3b3b3;
}
@media screen and (max-width:450px) {
    .deletebtn{
        font-size: inherit;
        margin: 5px 10px;
    }
}
</style>