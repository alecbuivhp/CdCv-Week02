function isSpecial(character) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return format.test(character)
}

function validatePassword(password) {
    let upp, low, num, sym, tot = 0
    let i = 0
    let character = ''
    while (i <= password.length) {
        character = password.charAt(i);
        if (!isNaN(character * 1)) {
            num = true
            tot++
        } else if (character.toLowerCase() != character.toUpperCase() && character == character.toUpperCase()) {
            upp = true
            tot++
        } else if (character.toLowerCase() != character.toUpperCase() && character == character.toLowerCase()) {
            low = true
            tot++
        } else if (isSpecial(character)) {
            sym = true
            tot++
        } else {
            return false
        }
        i++
    }

    if (!upp || !low || !num || !sym || tot < 8) {
        return false
    }

    return true
}
