<template>
  <div class="footer">
    <div class="footer-section">
      <span>
        <img
          class="footer-logo"
          src="@/images/logoPL.png"
        >

        <h3>{{ $t('teacher-views-footer.university-name') }}</h3>
      </span>

      <p>ul. Żeromskiego 116</p>

      <p>90-924 Łódź</p>

      <p>NIP: 727 002 18 95</p>
    </div>

    <div class="footer-section">
      <h2>Centrum E-Learningu</h2>

      <p class="footer-underline-text">
        {{ $t('teacher-views-footer.CEL-main-page') }}
      </p>

      <p class="footer-underline-text">
        {{ $t('teacher-views-footer.localization') }}
      </p>

      <p class="footer-text-before-line footer-underline-text">
        {{ $t('teacher-views-footer.working-hours') }}
      </p>

      <p class="footer-text-after-line">
        {{ $t('teacher-views-footer.technical-support') }}
      </p>

      <p class="footer-underline-text">
        Email: bok@edu.p.lodz.pl
      </p>

      <p class="footer-underline-text">
        {{ $t('teacher-views-footer.phone') }}: +48 426312806
      </p>
    </div>

    <div class="footer-section">
      <h2>{{ $t('teacher-views-footer.helpful-links') }}</h2>

      <p class="footer-underline-text">
        {{ $t('teacher-views-footer.main-page') }}
      </p>

      <p class="footer-text-before-line footer-underline-text">
        {{ $t('teacher-views-footer.library') }}
      </p>

      <p class="footer-text-after-line footer-underline-text">
        {{ $t('teacher-views-footer.email') }}
      </p>

      <p class="footer-underline-text">
        WebDziekanat
      </p>

      <p class="footer-underline-text">
        Office
      </p>

      <p class="footer-underline-text">
        VirTUL
      </p>
    </div>
  </div>
</template>

<style scoped>
  .footer {
    width: 95vw;
    background-color: #1a4a8f;
    color: white;
    padding: 30px 20px;
    margin-top: auto;
    /* position: static;
    bottom: 0; */
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
   @media (max-width: 600px) {
    .footer {
      flex-direction: column;
      align-items: center;
      position: static;
      bottom: 0;
      gap: 30px;
      padding: 20px 15px;
      width: 90vw;
    }

    .footer-section {
      width: 100%;
      align-items: center;
    }

    .footer-section h2 {
      font-size: 28px;
    }

    .footer-section h3 {
      font-size: 20px;
    }

    .footer-section p {
      font-size: 14px;
    }
  }
</style>
