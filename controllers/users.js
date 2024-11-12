

module.exports = {
    register: () => {
        res.status(200).json("sono la registrazione");
    },
    login: () => {
        res.status(200).json("sono il login");
    }
}