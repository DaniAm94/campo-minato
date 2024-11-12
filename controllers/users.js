

module.exports = {
    register: (req, res) => {
        res.status(200).json("sono la registrazione");
    },
    login: (req, res) => {
        res.status(200).json("sono il login");
    }
}