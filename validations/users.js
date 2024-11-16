const { PrismaClient } = require("@prisma/client");
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
                    throw new Error("Esiste già un utente con questa email.")
                }
                return true;
            }
        }
    }
}

module.exports = {
    registerBody
}