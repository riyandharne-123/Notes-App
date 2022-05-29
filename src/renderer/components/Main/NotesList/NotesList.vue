<template>
<b-container fluid>
<b-row>
<b-col cols="4" id="scrollable">
<br>

<b-form-group id="input-group-2">
  <b-form-input
    v-model="search"
    v-on:keyup="list()"
    placeholder="Search..."
  ></b-form-input>
</b-form-group>

<b-row>
  <b-col cols="12">
    <div class="text-center">
      <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="4"
        @input="list()"
      ></b-pagination>
    </div>
  </b-col>
</b-row>

<br>
 
 <b-row v-if="note_delete">
  <b-col align="center"><b-spinner variant="dark" label="Spinning"></b-spinner></b-col>
 </b-row>
 
 <NoteLoading v-if="notes_loaded" />

<b-list-group v-for="note in notes_list" :key="note._id">
  <b-list-group-item button>
   <b-button variant="danger" @click="delete_note(note._id)">
   <b-icon-trash-fill />
   </b-button>
   <router-link :to='"/main/notes/view_note/"+note._id'>
   <b-button variant="primary"><b-icon-eye-fill /></b-button>
   </router-link>
  <div class="media p-2">
  <div class="media-body">
    <h4>{{note.title}} <br> <small><i>Created on {{Date(note.createdAt)}}</i></small></h4>
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
       search: '',
       page: 1,
       total_page: 1,
       total: 0,
      }
    },
    methods:{
      list() {
      this.notes_loaded = true
      axios.get(process.env.BASE_URL + '/notes', {
        params: {
          search: this.search,
          page: this.page,
        }
      })
      .then(res =>{
        this.page = res.data.page;
        this.total_page = res.data.last_page;
        this.total = res.data.total
        this.notes_list = res.data.notes;
        this.notes_loaded = false
      })
      .catch(err =>{
        this.notes_loaded = false
      });
    },
     delete_note(id)
     { 
        this.note_delete = true
        axios.delete(process.env.BASE_URL + `/notes/${id}`)
        .then(res =>{
        this.notes_list = this.notes_list.filter(note => note._id != id)
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
      axios.get(process.env.BASE_URL + '/notes', {
        params: {
          search: this.search,
          page: this.page,
        }
      })
      .then(res =>{
        this.page = res.data.page;
        this.total_page = res.data.last_page;
        this.total = res.data.total
        this.notes_list = res.data.notes;
        this.notes_loaded = false
      })
      .catch(err =>{
        this.notes_loaded = false
      });
    },
  }
</script>