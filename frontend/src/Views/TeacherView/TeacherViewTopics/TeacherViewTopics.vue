<template>
  <div class="background">
    <header class="header">
      <div class="logo">
        <img src="@/images/logoPL.png" alt="Logo" />
        <h1>WIKAMP WEEIA</h1>
      </div>
      <nav class="nav">
        <div class="nav-button">
          <span class="department-text">Wirtualne Wydziały</span>
          <img class="arrow" src="@/images/arrowDown_icon.png" />
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/language_icon.png" />
          <span class="language-text">Polski (pl) </span>
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/search_icon.png" />
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/accessibility_icon.png" />
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/bell_icon.png" />
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/msg_icon.png" />
        </div>
        <div class="nav-button">
          <img class="nav-button-img" src="@/images/star_icon.png" />
        </div>
        <div class="user">
          <span class="user-name">Bolesław R.</span>
          <img class="user-img" src="@/images/emptyPfp.png" alt="User Icon" />
          <img class="arrow" src="@/images/arrowDown_icon.png" />
        </div>
      </nav>
    </header>
  </div>
</template>
  
  <script>
  export default {
    methods: {
      onButtonClick(action) {
        console.log(`${action} button clicked`);
    
      },
    },
  };
  </script>
  
  <style scoped>
  .background {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #f2f4f6;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  user-select: none;
   
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
  }
  
  .logo {
    display: flex;
    align-items: center;
  }
  
  .logo img {
    height: 75px;
    margin-right: 10px;
  }
  
  .logo h1 {
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    font-size: 36px;
    color: #1a4a9d;
    margin: 0;
    cursor: pointer;
  }
  .user{
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .user-name{
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
  
  /* .nav-button:hover {
    color: #0056b3;
  } */
  .arrow{
    width: 15px;
    height: 15px;
    margin-left: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .language-text{
    font-family: "Titillium Web", sans-serif;
    font-weight: 320;
    font-size: 17px;
  }
  .nav-button i {
    font-size: 20px;
  }
  </style>