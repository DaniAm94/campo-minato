// Middleware per la validazione dello slug utente

const RestError = require("../utils/restError");

module.exports = (req, res, next) => {

    // Preleva i dati dell'utente attualmente loggato
    const currentUser = req.user;

    // Preleva lo slug dalla request
    const slug = req.params.slug;

    // Se lo slug dell'utente loggato non coincide con quello nella request
    if (currentUser.slug !== slug) {
        // Viene passato un errore a next che verrà quindi catturato dal middleware errorHandler
        return next(new RestError('Non sei autorizzato', 403));
    }
    next();
}