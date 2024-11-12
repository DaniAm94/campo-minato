const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

const comparePassword = async (password, hashPassword) => {
    const isPasswordValid = await bcrypt.compare(password, hashPassword);
    return isPasswordValid;
}

module.exports = {
    hashPassword,
    comparePassword
}