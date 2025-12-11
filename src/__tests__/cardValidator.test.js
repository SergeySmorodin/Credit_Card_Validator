import { CardValidator } from "../js/cardValidator.js";

describe("CardValidator", () => {
  describe("luhnCheck", () => {
    test("должен возвращать true для валидных номеров карт", () => {
      const validCards = [
        "4111111111111111", // Visa
        "5555555555554444", // Mastercard
        "378282246310005", // American Express
        "6011111111111117", // Discover
        "30569309025904", // Diners Club
        "2202200874799834", // Мир
        "1234567812345670", // Тестовая Luhn
      ];

      validCards.forEach((card) => {
        expect(CardValidator.luhnCheck(card)).toBe(true);
      });
    });

    test("должен возвращать false для невалидных номеров карт", () => {
      const invalidCards = [
        "4111111111111112", // Невалидная Visa
        "5555555555554445", // Невалидная Mastercard
        "378282246310006", // Невалидная Amex
        "6011111111111118", // Невалидная Discover
        "1234567812345678", // Невалидная Luhn
      ];

      invalidCards.forEach((card) => {
        expect(CardValidator.luhnCheck(card)).toBe(false);
      });
    });

    test("должен корректно обрабатывать номера с пробелами и дефисами", () => {
      expect(CardValidator.luhnCheck("4111 1111 1111 1111")).toBe(true);
      expect(CardValidator.luhnCheck("4111-1111-1111-1111")).toBe(true);
      expect(CardValidator.luhnCheck("4111-1111-1111-1112")).toBe(false);
    });
  });

  describe("isValidFormat", () => {
    test("должен возвращать true для корректных номеров карт", () => {
      expect(CardValidator.isValidFormat("4111111111111111")).toBe(true);
      expect(CardValidator.isValidFormat("4111 1111 1111 1111")).toBe(true);
      expect(CardValidator.isValidFormat("378282246310005")).toBe(true);
    });

    test("должен возвращать false для слишком коротких номеров", () => {
      expect(CardValidator.isValidFormat("1234")).toBe(false);
      expect(CardValidator.isValidFormat("123456789012")).toBe(false);
    });

    test("должен возвращать false для слишком длинных номеров", () => {
      expect(CardValidator.isValidFormat("12345678901234567890")).toBe(false);
    });

    test("должен возвращать false для пустой строки", () => {
      expect(CardValidator.isValidFormat("")).toBe(false);
      expect(CardValidator.isValidFormat("   ")).toBe(false);
    });

    test("должен возвращать false для нецифровых символов", () => {
      expect(CardValidator.isValidFormat("abcd")).toBe(false);
      expect(CardValidator.isValidFormat("4111abcd11111111")).toBe(false);
    });
  });

  describe("validate", () => {
    test("должен возвращать true для валидных карт", () => {
      expect(CardValidator.validate("4111111111111111")).toBe(true);
      expect(CardValidator.validate("5555555555554444")).toBe(true);
      expect(CardValidator.validate("378282246310005")).toBe(true);
    });

    test("должен возвращать false для невалидных карт", () => {
      expect(CardValidator.validate("4111111111111112")).toBe(false);
      expect(CardValidator.validate("5555555555554445")).toBe(false);
      expect(CardValidator.validate("378282246310006")).toBe(false);
    });

    test("должен возвращать false для некорректного формата", () => {
      expect(CardValidator.validate("1234")).toBe(false);
      expect(CardValidator.validate("")).toBe(false);
      expect(CardValidator.validate("abcd")).toBe(false);
    });
  });
});
