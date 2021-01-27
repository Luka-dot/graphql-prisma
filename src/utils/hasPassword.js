import bcrypt from 'bcryptjs'

const hashPassword = (paswordString) => {
    if (paswordString.length < 8) {
        throw new Error('Pasword must be at least 8 character long.')
    }

    return bcrypt.hash(paswordString, 10)
}

export { hashPassword as default }