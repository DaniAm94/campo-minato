const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const paramsId = {
    cellId: {
        in: ["params"],
        isInt: {
            errorMessage: "L'id deve essere un numero intero",
            bail: true
        },
        toInt: true,
        custom: {
            options: async (value) => {

                const id = parseInt(value);

                const cell = await prisma.cell.findUnique({ where: { id } });

                if (!cell) throw new Error(`La cella cercata non esiste, id: ${id}`);

                return true;
            }
        }
    }
}

module.exports = { paramsId }