<template>
<b-container fluid>
<b-row>
<b-col cols="12" id="note">
<br>
<h3>{{note.heading}}
 <router-link :to='"/main/edit_note/"+note.id'>
 <b-button pill variant="outline-warning">Edit Note <b-icon-pencil-square/></b-button>
 </router-link>
</h3>
<hr>
<b-badge variant="dark" v-for="tag in JSON.parse(note.tags)" :key="tag" style="margin:2px;">
{{tag}}
</b-badge>
<hr>
<p v-html="note.body"></p>
</b-col>
</b-row>
</b-container>
</template>

<style scoped>
#note{
overflow-y: scroll;
overflow-x: scroll;
height:100vh;
}
</style>

<script>
 export default {
    data() {
      return {
       note_id: this.$route.params.id,
       note: '',
      }
    },
    mounted()
    {
       axios.get(`https://shrouded-reaches-24700.herokuapp.com/api/notes/${this.note_id}`)
      .then(res =>{
       this.note = res.data.note;
      })
      .catch(err =>{
        console.warn(err);
      });
    },
  }
</script>