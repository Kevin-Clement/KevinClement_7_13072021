<template>
    <div>
        <button type="submit" @click.prevent="deleteComment">X</button>
    </div>
</template>


<script>
import axios from "axios";
export default {
    name: "DeleteComment",
    props: {
        id: Number,
        idCom: Number,
    },
    data() {
        return {
        token: localStorage.getItem("token"),
        }
    },
    methods: {
        deleteComment() {
            if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
            axios
                .delete("http://localhost:3001/api/post/" + this.id + "/comment/" + this.idCom, {
                    headers: { Authorization: "Bearer " + this.token },
                })
                .then(() => {
                    alert("Votre commentaire a bien été supprimé !");
                    document.location.reload();
                })
                .catch((error) => {
                    console.log({ error });
                });
            }
        }
    },
};
</script>

<style scoped>

button {
    width: 20px;
    border-radius: 50%;
    cursor: pointer;
    background-color: rgb(189, 20, 20);
    color: white;
    position: relative;
}
</style>