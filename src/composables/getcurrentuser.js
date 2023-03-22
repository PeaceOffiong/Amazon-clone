

export const getValueFromLocalStorage = (key) => {
    const defaultName = "Jane "
    const item = key;
    const result = localStorage.getItem(item)
    if (result) {
        result.split(" ").splice(0, 1);
        return { result }
    }
    return { defaultName };
} 