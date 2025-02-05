export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatPercent = (num: number) => {
  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const formatSupply = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
