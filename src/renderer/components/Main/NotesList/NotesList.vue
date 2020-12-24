<template>
<b-container fluid>
<b-row>
<b-col cols="4" id="scrollable">
<br>
 
 <b-row v-if="note_delete">
  <b-col align="center"><b-spinner variant="dark" label="Spinning"></b-spinner></b-col>
 </b-row>
 
 <NoteLoading v-if="notes_loaded" />

<b-list-group v-for="note in notes_list" :key="note.id">
  <b-list-group-item button>
   <b-button variant="danger" @click="delete_note(note.id)">
   <b-icon-trash-fill />
   </b-button>
   <router-link :to='"/main/notes/view_note/"+note.id'>
   <b-button variant="primary"><b-icon-eye-fill /></b-button>
   </router-link>
  <div class="media p-2">
  <div class="media-body">
    <h4>{{note.heading}} <br> <small><i>Created on {{note.created_at}}</i></small></h4>
    <p>
    <b-badge variant="dark" v-for="tag in JSON.parse(note.tags)" :key="tag" style="margin:2px;">
    {{tag}}
   </b-badge>
    </p>
  </div>
  </div>
  </b-list-group-item>
  <br>
</b-list-group>
</b-col>
<b-col cols="8">
 <router-view :key="$route.fullPath"></router-view>
</b-col>
</b-row>
</b-container>
</template>

<style scoped>
#scrollable{
overflow-y: scroll;
height:100vh;
}
</style>

<script>
import NoteLoading from './NoteLoading'
 export default {
    components: {
      NoteLoading,
    },
    data() {
      return {
       notes_list: [],
       note_delete:false,
       notes_loaded:false,
      }
    },
    methods:{
     delete_note(id)
     { 
       this.note_delete = true
      axios.delete(`https://shrouded-reaches-24700.herokuapp.com/api/notes/${id}`)
      .then(res =>{
       // console.log(res.data.notes);
      this.notes_list = res.data.notes;
      this.$router.push(`/main/notes/`);
      this.note_delete = false
      })
      .catch(err =>{
        this.note_delete = false
        console.warn(err);
      });
     }
    },
    created()
    {
      this.notes_loaded = true
      axios.get('https://shrouded-reaches-24700.herokuapp.com/api/notes')
      .then(res =>{
       // console.log(res.data.notes);
      this.notes_list = res.data.notes;
      this.notes_loaded = false
      })
      .catch(err =>{
        console.warn(err);
        this.notes_loaded = false
      });

    },
  }
</script>