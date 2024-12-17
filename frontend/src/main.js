import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './routes/router'

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

const userData = localStorage.getItem('NextBid-user')
if (userData) {
  setUser(JSON.parse(userData))
}

app.provide('user', { user, setUser, setBio, saveUser, deleteUser })
app.use(router)
app.mount('#app')
