// Middleware che controlla che la cella non sia già stata rivelata

const { PrismaClient } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();


module.exports = async (req, res, next) => {
    const id = req.params.cellId;

    try {
        const cell = await prisma.cell.findUnique({ where: { id } });

        // Se la cella è già stata rivelata propago un errore
        if (cell.revealed) {
            return next(new RestError('Non puoi eseguire questa operazione su una cella già rivelata', 400))
        }
        next();

    } catch (err) {

        // L'errore verra catturato dal middleware errorHandler
        next(err);
    }
}