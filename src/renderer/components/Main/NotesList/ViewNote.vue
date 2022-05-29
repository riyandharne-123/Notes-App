<template>
<b-container fluid>
<b-row>
<b-col cols="12" id="note">
<br>
<h3>{{note.title}}
 <router-link :to='"/main/edit_note/"+note._id'>
 <b-button pill variant="outline-warning">Edit Note <b-icon-pencil-square/></b-button>
 </router-link>
</h3>
<hr>
<p v-html="note.description"></p>
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
       axios.get(process.env.BASE_URl + `/notes/${this.note_id}`)
      .then(res =>{
       this.note = res.data;
      })
      .catch(err =>{
        console.warn(err);
      });
    },
  }
</script>