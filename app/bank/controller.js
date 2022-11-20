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
            alert,
            name: req.session.user.name,
            title: 'Halaman bank'
        })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    viewCreate: async(req,res) => {
        try {
            res.render('admin/bank/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Bank'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    createBank: async(req, res) => {
        try {
            const { name, bankName, noRekening} = req.body;

            const bank = await Bank({ name, bankName, noRekening })
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

            res.render('admin/bank/edit', { 
                bank ,
                name: req.session.user.name,
                title: 'Halaman Edit Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },

    editBank: async(req, res) => {
        try {
            const { id } = req.params;
            const { name, bankName, noRekening} = req.body;

            const bank = await Bank.findOneAndUpdate({
                _id: id
            }, {
                name, bankName, noRekening
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