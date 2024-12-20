const { PrismaClient, GameLevels, GameStatus } = require("@prisma/client");
const RestError = require("../utils/restError");
const prisma = new PrismaClient();

// Enum values come costanti per evitare calcoli ripetuti
const GAME_LEVELS = Object.values(GameLevels);
const GAME_STATUS = Object.values(GameStatus);


// Validazione del gameId nei params della request
const paramsId = {
    gameId: {
        in: ["params"],
        toInt: true,
        isInt: {
            errorMessage: "L'id deve essere un numero intero",
            bail: true
        },
        custom: {
            options: async (value) => {
                const game = await prisma.game.findUnique({ where: { id: value } });
                if (!game) throw new RestError(`La partita cercata non esiste, id: ${id}`);
                return true;
            }
        }
    }
}


// Validazione campo difficulty nel body della request
const bodyDifficulty = {
    difficulty: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Devi selezionare una difficoltà",
            bail: true
        },
        isString: {
            errorMessage: "La difficoltà deve essere una stringa",
            bail: true
        },
        custom: {
            options: (value) => {
                if (!GAME_LEVELS.includes(value))
                    throw new RestError("Difficoltà non valida");
                return true
            }
        }
    }
}


// Validazione campo status nel body della request
const bodyStatus = {
    status: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Devi selezionare un valore per lo status",
            bail: true
        },
        isString: {
            errorMessage: "Lo status deve essere una stringa",
            bail: true
        },
        custom: {
            options: (value) => {
                if (!GAME_STATUS.includes(value))
                    throw new RestError("Status non valido");
                return true;
            }
        }
    }
}

module.exports = { paramsId, bodyDifficulty, bodyStatus };

