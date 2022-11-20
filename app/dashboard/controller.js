const Category = require('../category/model')
const Transaction = require('../transaction/model')
const Player = require('../player/model')
const Voucher = require('../voucher/model')

module.exports = {
    dashboard: async(req, res) => {
        try {
            const category = await Category.countDocuments()
            const transaction = await Transaction.countDocuments()
            const voucher = await Voucher.countDocuments()
            const player = await Player.countDocuments()

        res.render('admin/dashboard/view_dashboard', {
            name: req.session.user.name,
            title: 'Halaman Dashboard',
            count: {
                category,
                transaction,
                voucher,
                player
            }
            
        })   //menghubungkna ke views/index.ejs
        } catch (error) {
            console.log(error)
        }
    }
}