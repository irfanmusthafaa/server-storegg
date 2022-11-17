const Category = require('./model')

module.exports = {
    category: async(req, res) => {
        try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")

        const alert = {message: alertMessage, status: alertStatus}
        const category = await Category.find();

        res.render('admin/category/view_category', {  //menghubungkna ke halaman view_category
            category,
            alert,
            name: req.session.user.name,
            title: 'Halaman Kategori'
        })   
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    viewCreate: async(req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Kategori'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    createCategory: async(req, res) => {
        try {
            const { name } = req.body;

            const category = await Category({ name })
            await category.save()

            req.flash('alertMessage', "Berhasil tambah data kategori")
            req.flash('alertStatus', 'success')

            res.redirect('/category')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    viewEdit: async(req, res) => {
        try{
            const { id } = req.params
            const category = await Category.findOne({_id: id})

            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Halaman Edit Kategori'
            })
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    editCategory: async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const category = await Category.findOneAndUpdate({
                _id: id
            },{
                name
            })

            req.flash('alertMessage', "Berhasil edit data kategori")
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },

    deleteCategory: async(req, res) => {
        try {
            const { id } = req.params;

            const category = await Category.findOneAndRemove({_id: id})

            req.flash('alertMessage', "Berhasil hapus data kategori")
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}