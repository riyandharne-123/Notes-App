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
        note_body:'',
        show_alert:false,
        alert_message: [],
        loading:false,
      }
    },
    methods: {
     add_note:function()
     {
      this.alert_message = []
      this.loading = true
      axios.post(process.env.BASE_URL + '/notes', {
        'title': this.note_heading,
        'description': this.note_body,
      }).then(res => {
        this.$router.push(`/main/notes`);
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
        this.loading = false
        this.show_alert = true
      });
     },
    },
  }
</script>