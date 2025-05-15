<template>
  <div
    class="modal-overlay"
    tabindex="0"
    @keydown.esc="$emit('close')"
  >
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">Potwierdź usunięcie</span>

        <span
          class="modal-close"
          @click="$emit('close')"
        >&times;</span>
      </div>

      <div class="modal-body">
        <span>Czy naprawdę chcesz usunąć ten temat?</span>
      </div>

      <div class="modal-actions">
        <button
          class="modal-confirm"
          type="button"
          @click="$emit('confirm')"
        >
          Tak
        </button>

        <button
          class="modal-cancel"
          type="button"
          @click="$emit('close')"
        >
          Nie
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  padding: 32px 28px 24px 28px;
  min-width: 320px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.modal-title {
  font-size: 24px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
}
.modal-close {
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
}
.modal-body {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  font-size: 18px;
  font-family: "Titillium Web", sans-serif;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}
.modal-confirm {
  background: #c0392b;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 18px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-confirm:hover {
  background: #a93226;
}
.modal-cancel {
  background: #eee;
  color: #222;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 18px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.modal-cancel:hover {
  background: #ddd;
}
</style>
