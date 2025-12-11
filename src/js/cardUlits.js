export const CardUlits = {
  // Возвращает читаемое название платежной системы
  getDisplayName(systemCode) {
    const names = {
      visa: "Visa",
      mastercard: "Mastercard",
      mir: "Мир",
      amex: "American Express",
      discover: "Discover",
      jcb: "JCB",
      diners: "Diners Club",
    };

    return names[systemCode] || "Неизвестная система";
  },

  // Добавляет пробелы через каждые 4 цифры
  formatCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\D/g, "");
    const parts = [];

    for (let i = 0; i < cleaned.length; i += 4) {
      parts.push(cleaned.substring(i, i + 4));
    }

    return parts.join(" ");
  },

  // Очищает номер карты от нецифровых символов
  cleanCardNumber(cardNumber) {
    return cardNumber.replace(/\D/g, "");
  },
};
