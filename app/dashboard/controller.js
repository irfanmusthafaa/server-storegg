module.exports = {
    dashboard: async(req, res) => {
        try {
        res.render('index')   //menghubungkna ke views/index.ejs
        } catch (error) {
            console.log(error)
        }
    }
}