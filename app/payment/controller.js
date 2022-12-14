const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
    payment: async(req, res) => {
        try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = {message: alertMessage, status: alertStatus}
        const payment = await Payment.find().populate('banks')

        res.render('admin/payment/view_payment', {
            payment,
            alert,
            name: req.session.user.name,
            title: 'Halaman Jenis Pembayaran'
        })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewCreate: async(req,res) => {
        try {
            const bank = await Bank.find()

            res.render('admin/payment/create', {
                bank,
                name: req.session.user.name,
                title: 'Halaman Tambah Jenis Pembayaran'
            });
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    createPayment: async(req, res) => {
        try {
            const { type, banks } = req.body;

            const payment = await Payment({ type, banks })
            await payment.save()

            req.flash('alertMessage', "Berhasil tambah data payment")
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewEdit: async(req,res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.find()

            const payment = await Payment.findOne({ _id: id }).populate('banks')

            res.render('admin/payment/edit', { 
                payment, 
                bank,
                name: req.session.user.name,
                title: 'Halaman Edit Jenis Pembayaran'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    editPayment: async(req, res) => {
        try {
            const { id } = req.params;
            const { type, banks } = req.body;

            const payment = await Payment.findOneAndUpdate({
                _id: id
            }, {
                type, banks
            })

            req.flash('alertMessage', "Berhasil edit data payment")
            req.flash('alertStatus', 'success')

            res.redirect('/payment')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    deletePayment: async(req, res) => {
        try {
            const { id } = req.params
            
            const payment = await Payment.findOneAndRemove({ _id: id})

            req.flash('alertMessage', "Berhasil hapus data payment")
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionStatus: async(req, res) => {
        try {
            const { id } = req.params

            let payment = await Payment.findOne({ _id: id })

            let status = payment.status === 'Y' ? 'N' : 'Y'

            payment = await Payment.findOneAndUpdate({ _id: id }, {
                status
            })

            req.flash('alertMessage', "Berhasil ubah status")
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}