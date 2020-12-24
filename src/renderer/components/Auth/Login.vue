<template>
  <main class="d-flex align-items-center min-vh-100 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/images/login.jpg" alt="login" class="login-card-img">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <p class="login-card-description">Welcome To Task Manager</p>
              <form>
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input type="email" name="email" id="email" v-model="form.email" class="form-control" placeholder="Email address">
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" v-model="form.password" id="password" class="form-control" placeholder="***********">
                  </div>
                  <input name="login" id="login" class="btn btn-block login-btn mb-4" @click="login" value="Login"/>
                  <b-row>
                   <b-col align="center" v-if="login_load">
                     <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
                   </b-col>
                   <b-col align="center" v-if="login_error">
                        <b-alert show dismissible variant="danger">
                        {{error_message}}
                        </b-alert>
                   </b-col>
                  </b-row>
                </form>
                <p class="login-card-footer-text">Don't have an account?
                 <a class="text-reset"><router-link to="/register">Register here</router-link></a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
   export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        login_load:false,
        error_message:'',
        login_error:false,
      }
    },
    created(){
    if(localStorage.getItem('token')!= null)
    {
      this.$router.push('/main/notes');
    }
    else{
      this.$router.push('/');
    }
    },
    methods: {
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
      },
                  //login function api
      login:function()
      {
        this.login_error = false
        this.login_load = true
        axios.post('https://shrouded-reaches-24700.herokuapp.com/api/login', {
          'email':this.form.email,
          'password':this.form.password,
        }).then(res => {
          //console.dir(res)
        localStorage.setItem('token',res.data.token);
        //routing to admin panel
        this.$router.push('/main/notes');
        this.login_load = false
        })
        .catch(err =>{
         this.login_load = false
         this.login_error = true
         this.error_message = err.response.data.status
        });
       return false;
       }
    },
  }
</script>


<style scoped>
@import '../../assets/css/login.css';
</style>