// Convers numbers to currency format.
// Input: a float or int number
// Output: a string in the format of $xxx,xxx
export const currencyConverter = (num) => {
    const conv =
        "$" +
        Math.round(num, 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return conv;
};
