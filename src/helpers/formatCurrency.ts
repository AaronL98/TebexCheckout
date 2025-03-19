export const formatCurrency = (value: number): string => {
    return `${value.toFixed(2)} USD`;
};

export const formatCurrencyShort = (value: number): string => {
    return `$${value.toFixed(2)}`;
};
