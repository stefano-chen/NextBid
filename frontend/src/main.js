import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './routes/router'
import axios from 'axios'

const app = createApp(App)
let user = ref(null)

function setUser(userData) {
  user.value = userData
}

function saveUser() {
  localStorage.setItem('NextBid-user', JSON.stringify(user.value))
}

function setBio(newBio) {
  if (user.value) {
    user.value.bio = newBio
  }
}

function deleteUser() {
  setUser(null)
  localStorage.removeItem('NextBid-user')
}

const init = async () => {
  try {
    const response = await axios.get('/api/whoami')
    const body = await response.data
    const userData = JSON.parse(localStorage.getItem('NextBid-user'))
    if (body._id === userData?._id) {
      setUser(userData)
    } else {
      await axios.get('/api/auth/signout')
      deleteUser()
    }
  } catch {
    deleteUser()
  }
}

// const userData = localStorage.getItem('NextBid-user')
// if (userData) {
//   setUser(JSON.parse(userData))
// }

init()
  .then(() => {
    app.provide('user', { user, setUser, setBio, saveUser, deleteUser })
    app.use(router)
    app.mount('#app')
  })
  .catch((error) => {
    console.log(error)
  })
