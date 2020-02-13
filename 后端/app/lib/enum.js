function isThisType(val) {
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    isThisType
}

const ArtType = {
    SOURCE: 100,
    BOOK: 200,
    isThisType
}

module.exports = { LoginType, ArtType }