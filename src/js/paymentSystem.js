/**
 * Определения платежной системы по номеру карты
 **/


import { CardUtils } from "./cardUtils";


export const PaymentSystem = {
  detect(cardNumber) {
    const cleaned = CardUtils.cleanCardNumber(cardNumber);
    
    if (!cleaned || cleaned.length < 6) {
      return null;
    }

    // Visa: начинается с 4
    if (this.isVisa(cleaned)) {
      return "visa";
    }
 
    // Mastercard: начинается с 51-55 или 2221-2720
    if (this.isMastercard(cleaned)) {
      return "mastercard";
    }

    // Мир: начинается с 2200-2204
    if (this.isMir(cleaned)) {
      return "mir";
    }

    // American Express: начинается с 34 или 37
    if (this.isAmex(cleaned)) {
      return "amex";
    }

    // Discover: начинается с 6011, 644-649, или 65
    if (this.isDiscover(cleaned)) {
      return "discover";
    }

    // JCB: начинается с 3528-3589
    if (this.isJCB(cleaned)) {
      return "jcb";
    }

    // Diners Club: начинается с 36, 38, 39 или 300-305
    if (this.isDinersClub(cleaned)) {
      return "diners";
    }
    return null;
  },

  isVisa(cardNumber) {
    return /^4/.test(cardNumber);
  },

  isMastercard(cardNumber) {
    if (/^5[1-5]/.test(cardNumber)) {
      return true;
    }

    if (/^2[2-7]/.test(cardNumber)) {
      const firstFour = parseInt(cardNumber.substring(0, 4), 10);
      return firstFour >= 2221 && firstFour <= 2720;
    }

    return false;
  },

  isMir(cardNumber) {
    return /^220[0-4]/.test(cardNumber);
  },

  isAmex(cardNumber) {
    return /^3[47]/.test(cardNumber);
  },

  isDiscover(cardNumber) {
    return (
      /^6011/.test(cardNumber) ||
      /^64[4-9]/.test(cardNumber) ||
      /^65/.test(cardNumber)
    );
  },

  isJCB(cardNumber) {
    const firstFour = parseInt(cardNumber.substring(0, 4), 10);
    return firstFour >= 3528 && firstFour <= 3589;
  },

  isDinersClub(cardNumber) {
    return /^3[689]/.test(cardNumber) || /^30[0-5]/.test(cardNumber);
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PaymentSystem };
}
