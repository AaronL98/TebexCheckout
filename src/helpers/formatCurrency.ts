export const formatCurrency = (value: number): string => {
    return `${value?.toFixed(2) ?? "0.00"} USD`;
};

export const formatCurrencyShort = (value: number): string => {
    return `$${value?.toFixed(2) ?? "0.00"}`;
};
