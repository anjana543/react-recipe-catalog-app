const currency = '$';

/**
 * @description Function to Parse the price to decimals and add the currency symbol.
 * @param {Number} price Price.
 * @returns {string} Raw Price.
 */
export const parseRawPrice = (price) => `${currency}${(price / 100).toFixed(2)}`;
