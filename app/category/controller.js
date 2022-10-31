module.exports = {
    index: async(req, res) => {
        try {
        res.render('index', {
            title: "Express"
        })   //menghubungkna ke views/index.ejs
        } catch (error) {
            console.log(error)
        }
    }
}