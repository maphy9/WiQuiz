<template>
  <div class="background">
    <Header />

    <div class="body">
      <div class="container">
        <span class="title-text"> Analiza Matematyczna I </span>
      </div>

      <div class="container">
        <div class="topics">
          <h3>Nazwa tematu: Granice funkcji</h3>

          <ul class="topics-list">
            <li class="topic-item">
              <span>1. Oblicz granicę: lim(x → 2) (x² + 3x − 4)</span>

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
              <span>2. Wyznacz granicę (jeżeli istnieje): lim(x → 0) (sin x / x)</span>

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
              <span>3. Funkcja ma granicę w punkcie, jeśli:</span>

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
              <span>4. Granica jednostronna lim(x → 0⁺) (1 / x) wynosi:</span>

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
            <span>Dodaj pytanie</span>

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

<script setup>
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
</style>
