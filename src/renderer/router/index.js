import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
//auth components
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
//main components
import Main from '../components/Main/Main'
import NewNote from '../components/Main/NewNote/NewNote'
import EditNote from '../components/Main/NewNote/EditNote'
import NotesList from '../components/Main/NotesList/NotesList'
import ViewNote from '../components/Main/NotesList/ViewNote'
//https://shrouded-reaches-24700.herokuapp.com
Vue.use(VueRouter)  

const routes = [
    {
      path: '/',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/main',
      component: Main,
      beforeEnter: (to,from,next) => {
        axios.get('https://shrouded-reaches-24700.herokuapp.com/api/verify_user')
        .then(res => {
          if(res.data.api_token == localStorage.getItem('token'))
          {
            next()
          }
        })
        .catch(err => 
          next('/'))
        },
      children: [
        {
          path: 'new_note',
          component: NewNote,
        },
        {
          path: 'notes',
          component: NotesList,
          children: [
            {
              path: 'view_note/:id/',
              component: ViewNote,
            },
          ]
        },
        {
          path: 'edit_note/:id/',
          component: EditNote,
        },
      ]
    },
  ]

  const router = new VueRouter({routes})

//auth guard
router.beforeEach((to,from,next) => {
  const jwtToken = `Bearer ${localStorage.getItem('token')}`;
window.axios.defaults.headers.common['authorization'] = jwtToken;
  next();
})

export default router