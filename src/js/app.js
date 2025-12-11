import { CardValidator } from "./cardValidator.js";
import { PaymentSystem } from "./paymentSystem.js";
import { DOMManager } from "./domManager.js";
import { CardUlits } from "./cardUlits.js";

class CardValidationApp {
  constructor() {
    this.domManager = new DOMManager();
    this.init();
  }

  init() {
    this.setupEventListeners();
    console.log("Инициализация из app");
  }

  setupEventListeners() {
    // Обработчик кнопки валидации
    this.domManager.setupValidateButtonListener(() => this.validateCard());

    // Обработчик нажатия Enter в поле ввода
    this.domManager.setupInputEnterListener(() => this.validateCard());

    // Обработчик форматирования ввода
    this.domManager.setupInputFormatListener(() => {
      this.domManager.resetValidationState();
    });

    // Обработчики для тестовых карт
    this.domManager.setupTestCardListeners(() => this.validateCard());
  }

  validateCard() {
    const cardNumber = this.domManager.getCardNumber();

    // Проверяем валидность
    const isValid = CardValidator.validate(cardNumber);

    // Определяем платежную систему
    const paymentSystem = PaymentSystem.detect(cardNumber);

    // Отображаем результат
    this.domManager.showValidationResult({
      isValid,
      paymentSystem,
      cardNumber: CardUlits.cleanCardNumber(cardNumber),
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CardValidationApp();
});

