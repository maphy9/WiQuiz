<template>
  <div class="background">
    <Header />

    <div class="body">
      <div class="container">
        <span class="title-text"> Analiza Matematyczna I </span>
      </div>

      <div class="container">
        <div class="topics">
          <h3>Wybór tematu:</h3>

          <ul class="topics-list">
            <li class="topic-item">
              <span>Granice (limity)</span>

              <div class="actions">
                <img
                  class="default-icon"
                  src="@/images/edit_icon.png"
                >

                <img
                  class="default-icon"
                  src="@/images/delete_icon.png"
                >
              </div>
            </li>

            <li class="topic-item">
              <span>Ciągłość funkcji</span>

              <div class="actions">
                <img
                  class="default-icon"
                  src="@/images/edit_icon.png"
                >

                <img
                  class="default-icon"
                  src="@/images/delete_icon.png"
                >
              </div>
            </li>

            <li class="topic-item">
              <span>Pochodne</span>

              <div class="actions">
                <img
                  class="default-icon"
                  src="@/images/edit_icon.png"
                >

                <img
                  class="default-icon"
                  src="@/images/delete_icon.png"
                >
              </div>
            </li>

            <li class="topic-item">
              <span>Całki</span>

              <div class="actions">
                <img
                  class="default-icon"
                  src="@/images/edit_icon.png"
                >

                <img
                  class="default-icon"
                  src="@/images/delete_icon.png"
                >
              </div>
            </li>
          </ul>

          <div class="add-topic">
            <span>Dodaj nowy temat</span>

            <img
              class="add-icon"
              src="@/images/add_icon.png"
            >
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/TeacherViewComponents/Footer.vue'
import Header from '@/components/TeacherViewComponents/Header.vue'
</script>

<style scoped>
  .background {
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    background: #f2f4f6 center/cover no-repeat;
    display: flex;
    align-items: center;
    position: relative;
  }
  .background::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4vh;
    background-color: #f2f4f6;
    z-index: 999;
  }
  .header {
    position: fixed;
    top: 2vh;
    width: 95vw;
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #ffffff;
    border-bottom: 3px solid #1a4a9d;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header-logo img {
    height: 75px;
    margin-right: 15px;
  }

  .header-logo h1 {
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    font-size: 36px;
    color: #1a4a9d;
    cursor: pointer;
  }
  .header-user{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .header-user-img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .header-user-name{
    font-family: "Titillium Web", sans-serif;
    font-weight: 320;
    font-size: 17px;
    margin-right: 10px;
    padding-left: 10px;
  }
  .nav {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .nav-button-img {
    width: 20px;
    height: 20px;
    display: block;
  }
  .nav-button {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .header-arrow{
    width: 15px;
    height: 15px;
    vertical-align: middle;
    display: inline-block;
    margin-left: 5px;
  }
  .header-language-text{
    font-family: "Titillium Web", sans-serif;
    font-weight: 320;
    font-size: 17px;
  }
  .nav-button i {
    font-size: 20px;
  }
  .body{
    display: flex;
    flex-direction: column;
    margin: 75px 0;
  }
  .container {
    width: 95vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    backdrop-filter: blur(5px);
    border-radius: 10px;
    margin-top: 60px;
    padding: 20px 20px;
  }
  .title-text{
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    font-size: 48px;
    padding-left: 40px;
    text-align: left;;
  }
  .topics {
    width: 100%;
    padding: 20px;
  }

  .topics h3 {
    font-family: "Titillium Web", sans-serif;
    font-size: 32px;
    font-weight: 500;
    padding-left: 30px;
    margin-bottom: 10px;
  }

  .topics-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .topic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 60px;
    border-bottom: 1px solid #ccc;
  }
  .topic-item:first-child {
    border-top: 1px solid #ccc;
  }
  .topic-item span {
    font-family: "Titillium Web", sans-serif;
    font-size: 24px;
    font-weight: 400;
  }

  .actions {
    display: flex;
  }

  .default-icon {
    width: 30px;
    height: 30px;
    margin-right: 75px;
    cursor: pointer;
  }
  .add-icon {
    width: 30px;
    height: 30px;
    margin-right: 180px;
    cursor: pointer;
  }
  .add-topic {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    font-family: "Titillium Web", sans-serif;
    font-size: 32px;
    font-weight: 600;
    padding-left: 30px;
    padding-right:60px;
    margin-top: 10px;
    cursor: pointer;
  }
  .footer {
    width: 95vw;
    background-color: #1a4a8f;
    color: white;
    padding: 30px 20px;
    position: static;
    bottom: 0;
    display: flex;
    font-family: "Titillium Web", sans-serif;
    justify-content: space-around;
    align-items: flex-start;
    border-radius: 10px 10px 0 0;
    text-align: center;
  }
  .footer-section {
    display: flex;
    flex-direction: column;
    padding-bottom: 3px;
  }
  .footer-section h3 {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .footer-section h2 {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 10px;
  }

  .footer-section p {
    font-size: 16px;
  }
  .footer-section span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer-logo {
    width: 60px;
    height: 93px;
    border: 1px solid #ffffff;
  }
  .footer-underline-text {
    cursor: pointer;
  }
  .footer-underline-text:hover {
    text-decoration: underline;
  }
  .footer-text-before-line {
    padding-bottom: 10px;
  }
  .footer-text-after-line {
    border-top: 1px solid #ffffff;
    padding-top: 10px;
  }
</style>
