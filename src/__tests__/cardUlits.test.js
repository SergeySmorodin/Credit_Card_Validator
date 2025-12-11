import { CardUtils } from "../js/cardUtils";

describe("Проверка вспомогательных функций", () => {
  describe("getDisplayName", () => {
    test("должен возвращать правильные названия систем", () => {
      expect(CardUtils.getDisplayName("visa")).toBe("Visa");
      expect(CardUtils.getDisplayName("mastercard")).toBe("Mastercard");
      expect(CardUtils.getDisplayName("mir")).toBe("Мир");
      expect(CardUtils.getDisplayName("amex")).toBe("American Express");
      expect(CardUtils.getDisplayName("discover")).toBe("Discover");
      expect(CardUtils.getDisplayName("jcb")).toBe("JCB");
      expect(CardUtils.getDisplayName("diners")).toBe("Diners Club");
    });

    test('должен возвравать "Неизвестная система" для неизвестных кодов', () => {
      expect(CardUtils.getDisplayName("unknown")).toBe("Неизвестная система");
      expect(CardUtils.getDisplayName("")).toBe("Неизвестная система");
      expect(CardUtils.getDisplayName(null)).toBe("Неизвестная система");
      expect(CardUtils.getDisplayName(undefined)).toBe("Неизвестная система");
    });
  });

  describe("formatCardNumber", () => {
    test("должен добавлять пробелы через каждые 4 цифры", () => {
        expect(CardUtils.formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
        expect(CardUtils.formatCardNumber("123")).toBe("123");

    });
  });

  describe("cleanCardNumber", () => {
    test("должен очищать номер карты от пробелов", () => {
      expect(CardUtils.cleanCardNumber("4111 1111 1111 1111")).toBe("4111111111111111");
    });

    test("должен очищать номер карты от дефисов", () => {
      expect(CardUtils.cleanCardNumber("4111-1111-1111-1111")).toBe("4111111111111111",);
    });

    test("должен возвращать пустую строку если нет цифр", () => {
      expect(CardUtils.cleanCardNumber("abcd-efgh-ijkl-mnop")).toBe("");
      expect(CardUtils.cleanCardNumber("   ")).toBe("");
    });
  });
});
