const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { hashPassword, comparePassword } = require("../utils/password.js");
const generateToken = require("../utils/generateToken.js");

const errorHandlerFunction = require("../utils/errorHandlerFunction.js");

const slugify = require("slugify");

module.exports = {
    register: async (req, res) => {

        // Estraggo i dati dal body della request
        const { nickname, email, password } = req.body;
        try {

            // Configuro un oggetto data per la creazione dell'utente con la password hashata
            const data = {
                email,
                nickname,
                slug: slugify(nickname),
                password: await hashPassword(password)
            }

            // Creo il nuovo utente
            const user = await prisma.user.create({ data });

            // Genero il token
            const token = generateToken({
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                slug: user.slug
            });

            // Preparo l'oggetto user per la respons, rimuovo campi non utili all'utente
            delete user.id;
            delete user.password;

            // Restituisco il token con email e nickName
            res.json({ token, user });

        } catch (err) {
            errorHandlerFunction(res, err);
        }
    },
    login: async (req, res) => {

        // Recupero i dati dal body della request
        const { email, password } = req.body;
        try {

            // Cerco l'utente nel db
            const user = await prisma.user.findUnique({ where: { email } })

            const loginError = new Error("Email o password errati.", 400);
            // Se l'utente non viene trovato lancio un errore
            if (!user) {
                throw loginError;
            }

            // Controllo la passowrd
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) throw loginError;

            const data = {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
                slug: user.slug
            }

            // Genero il token
            const token = generateToken(data);

            // Invio la risposta in json
            res.json({ token, data });
        } catch (err) {
            errorHandlerFunction(res, err);
        }
    }
}