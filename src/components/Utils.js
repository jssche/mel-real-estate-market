export const currencyConverter = (num) => {
    const conv =
        "$" +
        Math.round(num, 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return conv;
};
