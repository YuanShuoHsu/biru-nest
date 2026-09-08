export const CURRENCY_REGEX = /^[A-Z]{3}$/;

export const isValidCurrency = (value: unknown): value is string =>
  typeof value === 'string' && CURRENCY_REGEX.test(value);
