import { DOMManager } from "../js/domManager.js";

// mock для тестов
beforeEach(() => {
  document.body.innerHTML = `
    <div class="container">
      <input type="text" id="cardNumber" class="card-input" />
      <button id="validateBtn">Проверить</button>
      <div id="result" class="result"></div>
      <div class="payment-icons">
          <div class="icon-container" data-system="visa"></div>
          <div class="icon-container" data-system="mastercard"></div>
        </div>
      <div class="test-card" data-number="4111111111111111">
        <span class="test-number">4111 1111 1111 1111</span>
        <span class="test-badge visa-badge">Visa</span>
      </div>
    </div>
  `;
});

describe("DOMManager", () => {
  let domManager;

  beforeEach(() => {
    domManager = new DOMManager();
  });

  describe("конструктор", () => {
    test("должен кэшировать элементы DOM", () => {
      expect(domManager.elements.cardInput).toBeDefined();
      expect(domManager.elements.validateBtn).toBeDefined();
      expect(domManager.elements.resultDiv).toBeDefined();
      expect(domManager.elements.testCards).toBeDefined();
    });

    test("должен находить все элементы", () => {
      expect(domManager.elements.cardInput.id).toBe("cardNumber");
      expect(domManager.elements.validateBtn.id).toBe("validateBtn");
      expect(domManager.elements.resultDiv.id).toBe("result");
    });
  });

  describe("getCardNumber и setCardNumber", () => {
    test("должен получать значение из поля ввода", () => {
      domManager.elements.cardInput.value = "4111111111111111";
      expect(domManager.getCardNumber()).toBe("4111111111111111");
    });

    test("должен форматировать и устанавливать номер карты", () => {
      domManager.formatAndSetCardNumber("4111111111111111");
      expect(domManager.elements.cardInput.value).toBe("4111 1111 1111 1111");
    });
  });

  describe("resetValidationState", () => {
    test("должен сбрасывать классы валидации", () => {
      domManager.elements.cardInput.classList.add("valid");
      domManager.elements.resultDiv.style.display = "block";

      domManager.resetValidationState();

      expect(domManager.elements.cardInput.classList.contains("valid")).toBe(
        false,
      );
      expect(domManager.elements.cardInput.classList.contains("invalid")).toBe(
        false,
      );
      expect(domManager.elements.resultDiv.style.display).toBe("none");
    });
  });

  describe("highlightPaymentIcon", () => {
    test("должен подсвечивать указанную иконку", () => {
      const visaIcon = document.querySelector('[data-system="visa"]');
      const mastercardIcon = document.querySelector(
        '[data-system="mastercard"]',
      );

      domManager.highlightPaymentIcon("visa");

      expect(visaIcon.classList.contains("active")).toBe(true);
      expect(mastercardIcon.classList.contains("active")).toBe(false);
    });

    test("должен снимать подсветку с предыдущей иконки", () => {
      const visaIcon = document.querySelector('[data-system="visa"]');
      const mastercardIcon = document.querySelector(
        '[data-system="mastercard"]',
      );

      // Сначала подсвечиваем Visa
      visaIcon.classList.add("active");
      // Затем подсвечиваем Mastercard
      domManager.highlightPaymentIcon("mastercard");

      expect(visaIcon.classList.contains("active")).toBe(false);
      expect(mastercardIcon.classList.contains("active")).toBe(true);
    });

    test("не должен падать если иконка не найдена", () => {
      expect(() => {
        domManager.highlightPaymentIcon("unknown");
      }).not.toThrow();
    });
  });

  describe("showValidationResult", () => {
    test("должен отображать валидную карту с платежной системой", () => {
      domManager.showValidationResult({
        isValid: true,
        paymentSystem: "visa",
        cardNumber: "4111111111111111",
      });

      const resultDiv = domManager.elements.resultDiv;

      expect(resultDiv.className).toBe("result valid");
      expect(resultDiv.style.display).toBe("block");
      expect(resultDiv.innerHTML).toContain("✅ Карта валидна!");
      expect(resultDiv.innerHTML).toContain("Платёжная система: Visa");
      expect(resultDiv.innerHTML).toContain("Номер: 4111 1111 1111 1111");
    });

    test("должен отображать невалидную карту", () => {
      domManager.showValidationResult({
        isValid: false,
        paymentSystem: "visa",
        cardNumber: "4111111111111112",
      });

      const resultDiv = domManager.elements.resultDiv;

      expect(resultDiv.className).toBe("result invalid");
      expect(resultDiv.innerHTML).toContain("❌ Карта недействительна");
    });
  });

  describe("настройка обработчиков событий", () => {
    test("setupTestCardListeners должен добавлять обработчики кликов", () => {
      const mockCallback = jest.fn();
      const testCard = document.querySelector(".test-card");

      domManager.setupTestCardListeners(mockCallback);

      testCard.click();

      expect(mockCallback).toHaveBeenCalledWith("4111111111111111");
      expect(testCard.classList.contains("selected")).toBe(true);
    });

    test("setupValidateButtonListener должен добавлять обработчик клика", () => {
      const mockCallback = jest.fn();

      domManager.setupValidateButtonListener(mockCallback);

      domManager.elements.validateBtn.click();

      expect(mockCallback).toHaveBeenCalled();
    });

    test("setupInputEnterListener должен добавлять обработчик Enter", () => {
      const mockCallback = jest.fn();

      domManager.setupInputEnterListener(mockCallback);

      const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
      domManager.elements.cardInput.dispatchEvent(enterEvent);

      expect(mockCallback).toHaveBeenCalled();
    });

    test("setupInputFormatListener должен форматировать ввод", () => {
      const mockCallback = jest.fn();

      domManager.setupInputFormatListener(mockCallback);

      domManager.elements.cardInput.value = "4111";
      const inputEvent = new Event("input");
      domManager.elements.cardInput.dispatchEvent(inputEvent);

      expect(domManager.elements.cardInput.value).toBe("4111");
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});
