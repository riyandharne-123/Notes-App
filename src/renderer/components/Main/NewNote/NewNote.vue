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
     variant="primary"><h5>Submit</h5> <b-spinner v-if="loading" variant="light" label="Spinning"></b-spinner></b-button>
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
    loading:false,
      }
    },
    methods: {
     add_note:function()
     {
       this.loading = true
    axios.post('https://shrouded-reaches-24700.herokuapp.com/api/notes', {
      'heading':this.note_heading,
      'tags':this.note_tags,
      'body':this.note_body,
    }).then(res => {
   this.show_alert = true
   this.alert_message = res.data.message
   this.loading = false
     this.note_heading = '';
     this.note_tags = '';
     this.note_body = '';
    })
    .catch(err =>{
    console.warn(err)
    this.loading = false
    this.show_alert = true
    this.alert_message = err
    });
    return false;
     },
    },
  }
</script>