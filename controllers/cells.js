const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorHandlerFunction = require("../utils/errorHandlerFunction.js");

module.exports = {

    // Metodo che setta l'attributo revealed di una cell a true
    reveal: async (req, res) => {

        const id = parseInt(req.params.cellId);

        try {

            await prisma.cell.update({
                where: {
                    id
                },
                data: {
                    revealed: true
                }
            })

            res.status(200).json("Cella rivelata con successo")
        } catch (err) {
            errorHandlerFunction(res, err)
        }
    },

    // Metodo che toggola l'attributo flagged di una cell
    flag: async (req, res) => {

        const id = parseInt(req.params.cellId);

        try {


            // executeRaw permette di scrivere una query in SQL raw
            await prisma.$executeRaw`
                UPDATE Cell
                SET flagged = NOT flagged
                WHERE id = ${id}
                `;

            res.status(200).json("Cella flaggata con successo")
        } catch (err) {
            errorHandlerFunction(res, err);
        }

    }
}