<template>
    <div class="hero-body" style="background-color: white;">
      <div style="background-color: black;">
        <form @submit.prevent="handleSubmit">
          <div>Username</div>
          <input v-model="username" type="text">
          <div>Password</div>
          <input v-model="password" type="password">
          <div>Confirm Password</div>
          <input v-model="confirmPassword" type="password">
          <div>
            <button type="submit">Submit</button> <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const username = ref("")
  const password = ref("")
  const confirmPassword = ref("")
  const router = useRouter()
  const getData = async ()=>{
    try{
      const response = await axios.post('http://localhost:3000/register', {username : username,password : password})
      return response
    }
    catch(error){
      console.error(error)
    }
  }
  async function  handleSubmit(){
    if (!username.value.trim() || !password.value.trim()){
      alert('Username dan Password harus diisi')
      return
    }
    if (username.value.length > 8 || password.value.length > 8){
      alert('Username atau Password tidak boleh lebih dari 9 karakter')
      return
    }
    if (password.value !== confirmPassword.value){
      alert('Password dengan Confirm password mungkin berbeda')
      return
    }
    const response = await getData()
    if (response.data === "Username sudah terpakai, gunakan username yang lain"){
      alert(response.data)
      return
    }
    alert(response.data)
    router.push('/login')
      
    
  }
  </script>