const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction.js");
const prisma = new PrismaClient();

module.exports = {
    index: async (req, res) => {

        // Prelevo l'id dell'utente dalla request
        userId = req.user.id;
        try {

            // Prendo tutte le partite che hanno un match con lo userId
            const games = await prisma.game.findMany({
                where: { userId },
                orderBy: {
                    startTime: 'desc'
                }
            });

            res.status(200).json(games);

        } catch (err) {
            errorHandlerFunction(res, err)
        }

    },
    store: (req, res) => {
        return res.json("Crea una nuova partita");
    }
}