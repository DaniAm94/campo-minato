const { PrismaClient } = require("@prisma/client");
const errorHandlerFunction = require("../utils/errorHandlerFunction.js");
const generateGrid = require("../utils/generateGrid.js");
const generateCells = require("../utils/generateCells.js");
const prisma = new PrismaClient();

module.exports = {
    index: async (req, res) => {

        // Prelevo l'id dell'utente dalla request
        const userId = req.user.id;
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
    store: async (req, res) => {

        const { difficulty } = req.body;
        const userId = req.user.id;
        const gameData = {
            difficulty,
            userId
        }
        try {

            // Rendo la creazione di game, grid e cells un'operazione atomica. Se una fallisce, falliscono tutte
            const { game, grid, cells } = await prisma.$transaction(async (prisma) => {

                // Creazione partita
                const game = await prisma.game.create({ data: gameData })

                //Configurazione griglia
                const gridData = generateGrid(game.id, difficulty);
                // Creazione griglia della partita
                const grid = await prisma.grid.create({ data: gridData })

                // Aggiorno il campo gridId del game
                await prisma.game.update({
                    where: { id: game.id },
                    data: { gridId: grid.id }
                });

                // Creazione celle
                const newCells = generateCells(grid.id, grid.height, grid.width, grid.mineCount);
                // Salvataggio celle nel database
                await prisma.cell.createMany({ data: newCells, skipDuplicates: true });

                // Recupero celle da inviare nella response
                const cells = await prisma.cell.findMany({
                    where: {
                        gridId: grid.id
                    },
                    select: {
                        id: true,
                        row: true,
                        column: true,
                        isMine: true,
                        adjacentMines: true,
                        revealed: true,
                        flagged: true
                    }
                })
                return { game, grid, cells };
            })

            return res.status(201).json({
                message: 'Partita creata con successo!',
                game: { ...game, gridId: grid.id },
                grid,
                cells
            });

        } catch (err) {
            errorHandlerFunction(res, err)
        }

    },
    show: async (req, res) => {
        const gameId = parseInt(req.params.id);
        try {

            // Informazioni partita
            const game = await prisma.game.findUnique({
                where: {
                    id: gameId
                },
                include: {
                    grid: {
                        include: {
                            cells: {
                                select: {
                                    id: true,
                                    row: true,
                                    column: true,
                                    isMine: true,
                                    adjacentMines: true,
                                    revealed: true,
                                    flagged: true
                                }
                            }
                        }
                    },
                }
            })

            // Conteggio celle flaggate
            const flaggedCells = await prisma.cell.aggregate({
                where: {
                    gridId: game.grid.id,
                    flagged: true
                },
                _count: { id: true }
            })

            // Conteggio celle rivelate
            const revealedCells = await prisma.cell.aggregate({
                where: {
                    gridId: game.grid.id,
                    revealed: true
                },
                _count: { id: true }
            })

            res.status(200).json({
                ...game,
                grid: {
                    ...game.grid,
                    cellCounts: {
                        flaggedCells: flaggedCells._count.id,
                        revealedCells: revealedCells._count.id
                    }
                }
            })
        } catch (err) {
            errorHandlerFunction(res, err);
        }
    },
    resume: async (req, res) => {

        // Recupero il game id dai parametri della request
        const gameId = parseInt(req.params.id);
        try {
            // Recupero la partita dal db
            const game = await prisma.game.findUnique({
                where: {
                    id: gameId
                },
                include: {
                    // Griglia
                    grid: {
                        select: {
                            width: true,
                            height: true,
                            mineCount: true,
                            // Celle
                            cells: {
                                select: {
                                    id: true,
                                    row: true,
                                    column: true,
                                    isMine: true,
                                    adjacentMines: true,
                                    revealed: true,
                                    flagged: true
                                }
                            }
                        }
                    }
                }
            })

            res.status(200).json(game);

        } catch (err) {
            errorHandlerFunction(res, err)
        }
    }
}