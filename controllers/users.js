const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { hashPassword, comparePassword } = require("../utils/password.js");
const generateToke = require("../utils/generateToken.js");
const generateToken = require("../utils/generateToken.js");

module.exports = {
    register: async (req, res) => {

        // Estraggo i dati dal body della request
        const { nickname, email, password } = req.body;
        try {

            // Configuro un oggetto data per la creazione dell'utente con la password hashata
            const data = {
                email,
                nickname,
                password: await hashPassword(password)
            }

            // Creo il nuovo utente
            const user = await prisma.user.create({ data });

            // Genero il token
            const token = generateToken({
                email: user.email,
                nickname: user.nickname
            });

            // Preparo l'oggetto user per la respons, rimuovo campi non utili all'utente
            delete user.id;
            delete user.password;

            // Restituisco il token con email e nickName
            res.json({ token, user });

        } catch (err) {
            console.error(err);
            const statusCode = err.statusCode || 500;
            const message = err.customMessage || 'Server error';
            return res.status(statusCode).send(message);
        }
    },
    login: (req, res) => {
        res.status(200).json("sono il login");
    }
}