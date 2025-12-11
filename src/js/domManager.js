import { CardUlits } from "./cardUlits";


export class DOMManager {
  constructor() {
    this.elements = {};
    this.cacheElements();
  }

  cacheElements() {
    this.elements.cardInput = document.getElementById("cardNumber");
    this.elements.validateBtn = document.getElementById("validateBtn");
    this.elements.resultDiv = document.getElementById("result");
    this.elements.paymentIcons = document.querySelectorAll(".icon-container");
    this.elements.testCards = document.querySelectorAll(".test-card");
  }

  getCardNumber() {
    return this.elements.cardInput.value;
  }

  setCardNumber(value) {
    this.elements.cardInput.value = value;
  }

  formatAndSetCardNumber(cardNumber) {
    const formatted = CardUlits.formatCardNumber(cardNumber);
    this.setCardNumber(formatted);
  }

  // Сбрасывает состояние валидации
  resetValidationState() {
    this.elements.cardInput.classList.remove("valid", "invalid");
    this.elements.resultDiv.className = "result";
    this.elements.resultDiv.style.display = "none";
    this.resetPaymentIcons();
  }

  // Сбрасывает подсветку иконок платежных систем
  resetPaymentIcons() {
    this.elements.paymentIcons.forEach((icon) => {
      icon.classList.remove("active");
    });
  }

  // Подсвечивает иконку платежной системы
  highlightPaymentIcon(systemCode) {
    this.resetPaymentIcons();

    if (systemCode) {
      const activeIcon = document.querySelector(
        `[data-system="${systemCode}"]`,
      );
      if (activeIcon) {
        activeIcon.classList.add("active");
      }
    }
  }

  // Результат валидации
  showValidationResult({ isValid, paymentSystem, cardNumber }) {
    const resultDiv = this.elements.resultDiv;

    this.elements.cardInput.classList.add(isValid ? "valid" : "invalid");
    this.highlightPaymentIcon(paymentSystem);

    if (isValid) {
      let message = '<div class="result-content">';
      message += `<div class="result-title">✅ Карта валидна!</div>`;

      if (paymentSystem) {
        const systemName = CardUlits.getDisplayName(paymentSystem);
        message += `<div class="result-system">Платёжная система: ${systemName}</div>`;
      } else {
        message += `<div>Платёжная система: неизвестна</div>`;
      }

      message += `<div>Номер: ${CardUlits.formatCardNumber(cardNumber)}</div>`;
      message += `</div>`;

      resultDiv.innerHTML = message;
      resultDiv.className = "result valid";
    } else {
      resultDiv.innerHTML = `
                <div class="result-content">
                    <div class="result-title">❌ Карта недействительна</div>
                    <div>Проверьте правильность введённого номера</div>
                </div>
            `;
      resultDiv.className = "result invalid";
    }

    resultDiv.style.display = "block";
  }

  // Обработчики событий для тестовых карт
  setupTestCardListeners(callback) {
    this.elements.testCards.forEach((card) => {
      card.addEventListener("click", () => {
        const cardNumber = card.dataset.number;
        this.formatAndSetCardNumber(cardNumber);

        // Подсветка выбранной карты
        this.elements.testCards.forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");

        if (callback) {
          callback(cardNumber);
        }
      });
    });
  }

  // Обработчик для кнопки проверить
  setupValidateButtonListener(callback) {
    if (this.elements.validateBtn) {
      this.elements.validateBtn.addEventListener("click", callback);
    }
  }

  // Обработчик для ввода по Enter
  setupInputEnterListener(callback) {
    if (this.elements.cardInput) {
      this.elements.cardInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          callback();
        }
      });
    }
  }

  // Устанавливает обработчик форматирования для поля ввода
  setupInputFormatListener(callback) {
    if (this.elements.cardInput) {
      const formatCardInput = (input) => {
        const value = input.value;
        const formattedValue = CardUlits.formatCardNumber(value);
        input.value = formattedValue.substring(0, 19);
      };
  
      this.elements.cardInput.addEventListener("input", (e) => {
        formatCardInput(e.target);
        if (callback) {
          callback();
        }
      });
    }
  }
}
