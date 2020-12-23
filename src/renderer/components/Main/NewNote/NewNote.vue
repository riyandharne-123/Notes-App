<template>
<b-container fluid>
<br>
    <b-alert v-model="show_alert" variant="success" dismissible>
    {{alert_message}}
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
         <b-form-tags input-id="tags-basic" v-model="note_tags"></b-form-tags>
      </b-form-group> 
      <b-form-group>
         <wysiwyg v-model="note_body" />
      </b-form-group> 
      <b-button
     @click="add_note"
       variant="primary">Submit</b-button>
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
    note_tags:[],
    note_body:'',
    show_alert:false,
    alert_message:'',
      }
    },
    methods: {
     add_note:function()
     {
    axios.post('https://shrouded-reaches-24700.herokuapp.com/api/notes', {
      'heading':this.note_heading,
      'tags':this.note_tags,
      'body':this.note_body,
    }).then(res => {
   this.show_alert = true
   this.alert_message = res.data.message
     this.note_heading = '';
     this.note_tags = '';
     this.note_body = '';
    })
    .catch(err =>{
    console.warn(err)
    });
     },
    },
  }
</script>