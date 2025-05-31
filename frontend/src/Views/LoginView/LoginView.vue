<template>
  <div class="login-page">
    <header class="login-header">
      <h1>Centralny System Uwierzytelniania</h1>
    </header>

    <main class="login-container">
      <div class="login-logo">
        <img
          src="@/images/logo.png"
          alt="Logo"
        >

        <h2>virTUL</h2>

        <p>virtual Lodz University of Technology</p>
      </div>

      <div class="login-form">
        <label for="username">Login:</label>

        <input
          id="username"
          v-model="username"
          type="text"
          :placeholder="t('login-view.enter-your-username')"
        >

        <label for="password">{{ $t('login-view.password') }}</label>

        <input
          id="password"
          v-model="password"
          type="password"
          :placeholder="t('login-view.enter-your-password')"
        >

        <button
          type="button"
          @click="handleLogin"
        >
          {{ $t('login-view.login') }}
        </button>
      </div>

      <div class="login-footer">
        <p>{{ $t('login-view.security-alert') }}</p>
      </div>
    </main>

    <footer class="login-footer-bar">
      <div class="footer-left">
        <img
          src="@/images/logo.png"
          alt="Politechnika Łódzka"
        >

        <span>Politechnika Łódzka</span>
      </div>

      <div class="footer-center">
        <span class="span-red">virTUL | PŁ</span>

        <span class="hide-on-mobile">Ochrona Danych Osobowych</span>
      </div>

      <div class="footer-right">
        <span>© Uczelniane Centrum Informatyczne PŁ</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const username = ref('')
const password = ref('')

function handleLogin() {
  window.location.reload()
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Titillium Web", sans-serif;
  background-color: #f5f5f5;
}

.login-header {
  background-color: #8B231D;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
}
.login-header h1 {
  font-size: 24px;
  font-weight: normal;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 400px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-logo {
  text-align: center;
  margin-bottom: 20px;
}

.login-logo img {
  width: 80px;
  height: auto;
}

.login-logo h2 {
  margin: 10px 0 5px;
  font-size: 24px;
  color: #8B231D;
}

.login-logo p {
  font-size: 14px;
  color: #666;
}

.login-form {
  width: 100%;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #8B231D;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #a00000;
}

.login-footer {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.login-footer p{
  color: #8B231D;
}

.login-footer-bar {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  padding: 10px 20px;
  font-size: 14px;
  color: #666;
  position: absolute;
  bottom: 0;
}

.footer-left,
.footer-center,
.footer-right {
  display: flex;
  align-items: center;
}
.span-red {
  color: #8B231D;
}
.footer-center{
  flex-direction: column;
  padding-left: 50px;
}
.footer-right {
  padding-right: 40px;
}
.footer-left img {
  width: 30px;
  height: auto;
  margin-right: 10px;
}
@media (max-width: 550px){
  .hide-on-mobile {
    display: none;
  }
  .footer-center {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
