<template>
    <div>
        <button type="submit" @click.prevent="deletePost">X</button>
    </div>
</template>


<script>
import axios from "axios";
export default {
    name: "deletePost",
    props: {
        id: Number,
    },
    data() {
        return {
        token: "",
        };
    },
    methods: {
        deletePost() {
        let token = localStorage.getItem("token");
        axios
            .delete("http://localhost:3001/api/post/" + this.id, {
            headers: { Authorization: "Bearer " + token },
            })
            .then(() => {
            alert("Votre message a bien été supprimé !");
            document.location.reload();
            })
            .catch((error) => {
            console.log({ error });
            });
        },
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