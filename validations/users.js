const { PrismaClient } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è un campo obbligatorio',
            bail: true
        },
        isEmail: {
            errorMessage: 'Il formato dell\'email non è valido',
            bail: true
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });
                if (user) {
                    throw new RestError("Esiste già un utente con questa email.")
                }
                return true;
            }
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
        }
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è un campo obbligatorio.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email deve essere una mail valida',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
        }
    }
}

module.exports = {
    registerBody,
    loginBody
}