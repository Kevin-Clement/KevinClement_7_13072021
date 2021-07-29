<template>
  <div>
    <nav id="nav">
      <ul class="links">
        <li><router-link to="/wall">Accueil</router-link></li>
        <li><router-link :to="`/profile/${userId}`"> Profil</router-link></li>
        <li><a to="/login" v-on:click="Logout()"> Déconnexion</a></li>
      </ul>
    </nav>
    <h2>Wall</h2>
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