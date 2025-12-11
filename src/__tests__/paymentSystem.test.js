import { PaymentSystem } from "../js/paymentSystem.js";

describe("PaymentSystem", () => {
  describe("detect", () => {

    test("должен определять Visa", () => {
      expect(PaymentSystem.detect("4111111111111111")).toBe("visa");
      expect(PaymentSystem.detect("4012888888881881")).toBe("visa");
    });

    test("должен определять Mastercard", () => {
      expect(PaymentSystem.detect("5555555555554444")).toBe("mastercard");
      expect(PaymentSystem.detect("2720999999999996")).toBe("mastercard");
    });

    test("должен определять Мир", () => {
      expect(PaymentSystem.detect("2204123456789010")).toBe("mir");
      expect(PaymentSystem.detect("2200123456789012")).toBe("mir");
    });

    test("должен определять American Express", () => {
      expect(PaymentSystem.detect("378282246310005")).toBe("amex");
      expect(PaymentSystem.detect("341111111111111")).toBe("amex");
    });

    test("должен определять Discover", () => {
      expect(PaymentSystem.detect("6011111111111117")).toBe("discover");
      expect(PaymentSystem.detect("6565656565656565")).toBe("discover");
    });

    test("должен определять JCB", () => {
      expect(PaymentSystem.detect("3530111333300000")).toBe("jcb");
      expect(PaymentSystem.detect("3566002020360505")).toBe("jcb");
    });

    test("должен определять Diners Club", () => {
      expect(PaymentSystem.detect("30569309025904")).toBe("diners");
      expect(PaymentSystem.detect("36111111111111")).toBe("diners");
    });

    test("должен возвращать null для неизвестных систем", () => {
      expect(PaymentSystem.detect("1234567812345678")).toBeNull();
      expect(PaymentSystem.detect("")).toBeNull();
      expect(PaymentSystem.detect("1234")).toBeNull();
    });

    test("должен обрабатывать номера с пробелами", () => {
      expect(PaymentSystem.detect("4111 1111 1111 1111")).toBe("visa");
      expect(PaymentSystem.detect("5555 5555 5555 4444")).toBe("mastercard");
      expect(PaymentSystem.detect("3782 822463 10005")).toBe("amex");
    });
  });

  describe("методы проверки отдельных систем", () => {

    test("isVisa должен правильно определять Visa", () => {
      expect(PaymentSystem.isVisa("4111111111111111")).toBe(true);
      expect(PaymentSystem.isVisa("5111111111111111")).toBe(false);
    });

    test("isMastercard должен правильно определять Mastercard", () => {
      expect(PaymentSystem.isMastercard("5555555555554444")).toBe(true);
      expect(PaymentSystem.isMastercard("4111111111111111")).toBe(false);
    });

    test("isMir должен правильно определять Мир", () => {
      expect(PaymentSystem.isMir("2200123456789012")).toBe(true);
      expect(PaymentSystem.isMir("2205123456789010")).toBe(false);
    });

    test("isAmex должен правильно определять American Express", () => {
      expect(PaymentSystem.isAmex("371449635398431")).toBe(true);
      expect(PaymentSystem.isAmex("351111111111111")).toBe(false);
    });

    test("isDiscover должен правильно определять Discover", () => {
      expect(PaymentSystem.isDiscover("6565656565656565")).toBe(true);
      expect(PaymentSystem.isDiscover("6010111111111111")).toBe(false);
    });

    test("isJCB должен правильно определять JCB", () => {
      expect(PaymentSystem.isJCB("3566002020360505")).toBe(true);
      expect(PaymentSystem.isJCB("3590111111111111")).toBe(false);
    });

    test("isDinersClub должен правильно определять Diners Club", () => {
      expect(PaymentSystem.isDinersClub("39111111111111")).toBe(true);
      expect(PaymentSystem.isDinersClub("35111111111111")).toBe(false);
    });
  });
});
