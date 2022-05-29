<template>
<b-container fluid>
<br>
    <b-alert v-model="show_alert" variant="danger" dismissible>
      <ul>
        <li v-for="error in alert_message">{{error}}</li>
      </ul>
    </b-alert>
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
        note_body:'',
        note:'',
        show_alert: false,
        alert_message: [],
      }
    },
     created()
    {
      axios.get(process.env.BASE_URL + `/notes/${this.$route.params.id}`)
      .then(res =>{
        this.note = res.data;
        this.note_heading = this.note.title;
        this.note_body = this.note.description;
      })
      .catch(err =>{
        console.warn(err);
      });
    },
    methods: {
     edit_note:function()
     {
      this.alert_message = []
      axios.put(process.env.BASE_URL + `/notes/${this.$route.params.id}`, {
        'title':this.note_heading,
        'description':this.note_body,
      }).then(res => {
        this.show_alert = false;
        this.note_heading = '';
        this.note_body = '';
        this.$router.push(`/main/notes/view_note/${this.$route.params.id}`);
      })
      .catch(err =>{
        const errors = err.response.data.message
        if(!Array.isArray(errors))
        {
          this.alert_message.push(errors)
        } else {
          errors.map(error => {
            this.alert_message.push(error)
          })
        }
        this.show_alert = true;
      });
     },
    },
  }
</script>