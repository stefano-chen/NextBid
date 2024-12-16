import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './routes/router'

const app = createApp(App)
let user = ref(null)

function setUser(userData) {
  user.value = userData
}

app.provide('user', { user, setUser })

const userData = localStorage.getItem('NextBid-user')
console.log(user)
if (userData) {
  console.log(userData)
  setUser(JSON.parse(userData))
}

app.use(router)
app.mount('#app')
