module.exports = {
    dashboard: async(req, res) => {
        try {
        res.render('index', {
            name: req.session.user.name,
            title: 'Halaman Dashboard'
        })   //menghubungkna ke views/index.ejs
        } catch (error) {
            console.log(error)
        }
    }
}