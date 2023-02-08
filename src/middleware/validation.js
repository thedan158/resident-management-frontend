const checkUpperCase = (char) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(char) === true) return false
    if (char === char.toUpperCase()) return true;
    return false;
}
const checkLowerCase = (char) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(char) === true) return false
    if (char === char.toLowerCase()) return true;
    return false;
}
const checkNumeric = (char) => {
    if (char >= '0' && char <= '9') return true;
    return false;
}
export const checkSpecial = (char) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(char) === true) return true
    return false;
}
export const checkUpperCaseString = (string) => {
    for (let i = 0; i < string.length; i++) {
        if (checkUpperCase(string[i])) {
            return true
        }
    }
    return false
}
export const checkLowerCaseString = (string) => {
    for (let i = 0; i < string.length; i++) {
        if (checkLowerCase(string[i])) {
            return true
        }
    }
    return false
}
export const checkNumericString = (string) => {
    for (let i = 0; i < string.length; i++) {
        if (checkNumeric(string[i])) {
            return true
        }
    }
    return false
}
