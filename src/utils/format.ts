export const formatNumber = (num: number, options: { isCurrency?: boolean } = {}) => {
  const { isCurrency = false } = options;
  const isNegative = num < 0;
  const absoluteNum = Math.abs(num);

  if (absoluteNum >= 0.01) {
    return new Intl.NumberFormat('en-US', {
      style: isCurrency ? 'currency' : 'decimal',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  const formatted = absoluteNum.toLocaleString('en-US', {
    useGrouping: false,
    minimumFractionDigits: 20,
    maximumFractionDigits: 20,
  });

  const [, decimalPart] = formatted.split('.');
  const firstNonZeroIndex = decimalPart?.search(/[1-9]/) ?? -1;

  if (firstNonZeroIndex === -1) {
    const negativePrefix = isNegative ? '-' : '';

    return isCurrency ? `${negativePrefix}$0.00` : `${negativePrefix}0.00`;
  }

  const zeroCount = firstNonZeroIndex;
  const significantDigits = decimalPart.slice(firstNonZeroIndex).replace(/0+$/, '').slice(0, 4);

  const formattedSpecial = `0.0{${zeroCount}}${significantDigits}`;

  return [isNegative ? '-' : '', isCurrency ? '$' : '', formattedSpecial].join('');
};

export const formatPercent = (num: number | undefined) => {
  if (num === undefined) return '0.00%';

  return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const formatSupply = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
