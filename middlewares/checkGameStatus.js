// Middleware che controlla lo status di una partita

const { PrismaClient } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
    const { gameId: id } = req.params;
    try {
        // Recupero la partita
        const game = await prisma.game.findUnique({ where: { id }, select: { status: true } });

        // Se la partita è conclusa
        if (game.status !== 'IN_PROGRESS')
            // Blocco la chiamata
            return next(new RestError('Azione non consentita su una partita terminata', 400));

        next();
    } catch (err) {
        next(err)
    }
}