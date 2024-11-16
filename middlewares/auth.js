// Middleware per l'autenticazione delle richieste

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {

    // Preleva i parametri dell'autenticazione dall'header della richiesta
    const authHeader = req.headers.authorization;

    // Preleva il token
    const token = authHeader && authHeader.split(" ")[1];

    // Se non è presente lancia un errore e blocca la richiesta
    if (!token) {
        throw new RestError("Token non fornito", 401);
    }

    // Verifica la validità del token usando la chiave di decriptazione nel file .env
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            throw new Error("Token non valido", 403);
        }

        req.user = data;
        next();
    })
}