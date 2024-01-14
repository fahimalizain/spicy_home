import currency from 'currency.js';

export const SaudiRiyal = (value: number | string) =>
  currency(value, {
    symbol: 'SAR',
    decimal: '.',
    separator: ',',
    precision: 2,
  });
