<template>
<div>
  <b-navbar variant="dark" id="nav">
    <b-navbar-brand>
      <p class="h4 mb-2">
     <router-link to="/main/new_note">
      <b-button variant="success">Add Note <b-icon-pencil-square /></b-button>
     </router-link>
     <router-link to="/main/notes">
      <b-button variant="info">View Notes <b-icon-view-stacked /></b-button>
     </router-link>
      </p>
    </b-navbar-brand>
     <b-navbar-nav class="ml-auto">
      <p class="h4 mb-2">
      <b-button variant="danger" @click="logout">Logout <b-icon-door-open-fill /></b-button>
      </p>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<style scoped>

</style>

<script>
  export default {
    methods: {
      logout:function()
       {
          localStorage.removeItem('token');
          this.$router.push('/');
       }, 
    }
  }
</script>
