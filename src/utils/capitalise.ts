export const capitaliseFirstLetter = (str: string) => {
    const firstLetter = str.split("")[0];
    const rest = str.slice(1, str.length).toLowerCase();
    return firstLetter.toUpperCase() + rest;
};
