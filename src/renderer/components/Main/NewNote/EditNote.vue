<template>
<b-container fluid>
<br>
  <b-row>
    <b-col>
    <br>
    <b-form>
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          placeholder="Heading"
          v-model="note_heading"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group>
         <b-form-tags input-id="tags-basic" v-model="note_tags"></b-form-tags>
      </b-form-group> 
      <b-form-group>
         <wysiwyg v-model="note_body" />
      </b-form-group> 
      <b-button
       @click="edit_note"
       variant="primary">Edit</b-button>
    </b-form>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
 export default {
    data() {
      return {
        note_heading:'',
        note_tags:'',
        note_body:'',
        note:'',
      }
    },
     created()
    {
      axios.get(`https://shrouded-reaches-24700.herokuapp.com/api/notes/${this.$route.params.id}`)
      .then(res =>{
        this.note = res.data.note;
        this.note_heading = this.note.heading;
        this.note_tags = JSON.parse(this.note.tags);
        this.note_body = this.note.body;
      })
      .catch(err =>{
        console.warn(err);
      });
    },
    methods: {
     edit_note:function()
     {
      axios.put(`https://shrouded-reaches-24700.herokuapp.com/api/notes/${this.$route.params.id}`, {
        'heading':this.note_heading,
        'tags':this.note_tags,
        'body':this.note_body,
      }).then(res => {
        this.note_heading = '';
        this.note_tags = '';
        this.note_body = '';
        this.$router.push(`/main/notes/view_note/${this.$route.params.id}`);
      })
      .catch(err =>{
        console.warn(err)
      });
     },
    },
  }
</script>