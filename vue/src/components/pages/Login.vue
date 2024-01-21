<template>
  <div class="hero-body" style="background-color: white">
    <div style="background-color: black">
      <form @submit.prevent="handleSubmit">
        <div>Username</div>
        <input type="text" v-model="username" required />
        <div>Password</div>
        <input type="password" v-model="password" required />
        <div>
          <button type="submit">Submit</button> <a href="/register">Register</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const username = ref("");
const password = ref("");
async function checkToken() {
  if (window.localStorage.getItem("token") === null) {
    return false;
  }
  try {
    const response = await axios.post(
      "http://localhost:3000/checkToken",
      {},
      {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
onMounted(async () => {
  const isTokenValid = await checkToken();

  if (!isTokenValid) {
    alert("kamu ini siapaaa");
  } else {
    alert("selamat datang kembali");
  }
});
const login = async () => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });
    const token = response.data;
    return token;
  } catch (error) {
    console.error(error);
    return;
  }
};
async function handleSubmit() {
  if (!username.value.trim() || !password.value.trim()) {
    alert("Username dan Password harus diisi");
    return;
  }
  if (username.value.length > 8 || password.value.length > 8) {
    alert("Username atau Password tidak boleh lebih dari 9 karakter");
    return;
  }
  const token = await login();
  storeCredential(token);
  if (!token) {
    alert("Kamu siapa yah?");
    return;
  }
  alert("Selamat datang");
}

async function storeCredential(token) {
  window.localStorage.setItem("token", token);
}
</script>
