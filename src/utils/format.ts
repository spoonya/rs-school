export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  }).format(num);
};

export const formatPercent = (num: number | null) => {
  if (num === null) return '0.00%';

  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const formatSupply = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
