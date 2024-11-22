module.exports = {
    reveal: async (req, res) => {
        res.status(200).json("Sono reveal cells")
    },
    flag: async (req, res) => {
        res.status(200).json("Sono flag cells")
    }
}