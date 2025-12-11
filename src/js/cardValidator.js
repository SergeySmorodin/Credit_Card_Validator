export const CardValidator = {
  validate(cardNumber) {
    if (!this.isValidFormat(cardNumber)) {
      return false;
    }

    return this.luhnCheck(cardNumber);
  },

  // Проверка на число и количество символов
  isValidFormat(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");

    if (!cleaned) {
      return false;
    }
    if (!/^\d+$/.test(cleaned)) {
      return false;
    }
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }
    return true;
  },

  luhnCheck(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");

    return (
      cleaned
        .split("")
        .reverse()
        .reduce((sum, digit, index) => {
          const num = parseInt(digit, 10);
          // Удваиваем четные позиции после reverse
          if (index % 2 === 1) {
            return sum + (num * 2 > 9 ? num * 2 - 9 : num * 2);
          }
          return sum + num;
        }, 0) %
        10 ===
      0
    );
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CardValidator };
}
