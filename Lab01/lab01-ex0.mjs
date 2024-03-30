function letters(array) {
    let element = []
    for (let index = 0; index < array.length; index++) {
        let n = array[index].length;
        element[index] = array[index].slice(0, 2) + array[index].slice(n - 2, n);
    }
    return element;
}

const array = ['hello', 'salam', 'bye', 'spring', 'it', 'cat'];

console.log(letters(array))