const Bank = require('./model')

module.exports = {
    bank: async(req, res) => {
        try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = {message: alertMessage, status: alertStatus}
        const bank = await Bank.find();

        res.render('admin/bank/view_bank', {
            bank,
            alert
        })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewCreate: async(req,res) => {
        try {
            res.render('admin/bank/create');
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    createBank: async(req, res) => {
        try {
            const { name, nameBank, noRekening} = req.body;

            const bank = await Bank({ name, nameBank, noRekening })
            await bank.save()

            req.flash('alertMessage', "Berhasil tambah data bank")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewEdit: async(req,res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id })

            res.render('admin/bank/edit', { bank })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    editBank: async(req, res) => {
        try {
            const { id } = req.params;
            const { name, nameBank, noRekening} = req.body;

            const bank = await Bank.findOneAndUpdate({
                _id: id
            }, {
                name, nameBank, noRekening
            })

            req.flash('alertMessage', "Berhasil edit data bank")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    deleteBank: async(req, res) => {
        try {
            const { id } = req.params
            
            const bank = await Bank.findOneAndRemove({ _id: id})

            req.flash('alertMessage', "Berhasil hapus data bank")
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}