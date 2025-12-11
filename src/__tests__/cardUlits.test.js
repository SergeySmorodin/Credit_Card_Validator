import { CardUlits } from "../js/cardUlits";

describe("Проверка вспомогательных функций", () => {
  describe("getDisplayName", () => {
    test("должен возвращать правильные названия систем", () => {
      expect(CardUlits.getDisplayName("visa")).toBe("Visa");
      expect(CardUlits.getDisplayName("mastercard")).toBe("Mastercard");
      expect(CardUlits.getDisplayName("mir")).toBe("Мир");
      expect(CardUlits.getDisplayName("amex")).toBe("American Express");
      expect(CardUlits.getDisplayName("discover")).toBe("Discover");
      expect(CardUlits.getDisplayName("jcb")).toBe("JCB");
      expect(CardUlits.getDisplayName("diners")).toBe("Diners Club");
    });

    test('должен возвравать "Неизвестная система" для неизвестных кодов', () => {
      expect(CardUlits.getDisplayName("unknown")).toBe("Неизвестная система");
      expect(CardUlits.getDisplayName("")).toBe("Неизвестная система");
      expect(CardUlits.getDisplayName(null)).toBe("Неизвестная система");
      expect(CardUlits.getDisplayName(undefined)).toBe("Неизвестная система");
    });
  });

  describe("formatCardNumber", () => {
    test("должен добавлять пробелы через каждые 4 цифры", () => {
      expect(CardUlits.formatCardNumber("4111111111111111")).toBe(
        "4111 1111 1111 1111",
      );
      expect(CardUlits.formatCardNumber("123")).toBe("123");
    });
  });

  describe("cleanCardNumber", () => {
    test("должен очищать номер карты от пробелов", () => {
      expect(CardUlits.cleanCardNumber("4111 1111 1111 1111")).toBe(
        "4111111111111111",
      );
    });

    test("должен очищать номер карты от дефисов", () => {
      expect(CardUlits.cleanCardNumber("4111-1111-1111-1111")).toBe(
        "4111111111111111",
      );
    });

    test("должен возвращать пустую строку если нет цифр", () => {
      expect(CardUlits.cleanCardNumber("abcd-efgh-ijkl-mnop")).toBe("");
      expect(CardUlits.cleanCardNumber("   ")).toBe("");
    });
  });
});
