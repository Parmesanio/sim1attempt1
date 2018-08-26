module.exports = {
    getAll: (req, res) => {
        const db = req.app.get('db');

        db.get_inventory()
            .then(response => res.send(response))
            .catch(err => console.log('Err in getAll', err));
    },
    create: (req, res) => {
        let { productName, productUrl, productPrice } = req.body;
        const db = req.app.get('db');

        db.create_product([productName, productUrl, productPrice])
            .then(() => res.redirect('/'))
            .catch(err => console.log('Err in create', err));
    },
    delete: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;

        db.delete_product(id)
            .then(() => res.redirect('/'))
            .catch(err => console.log('Err in delete', err));

    },
    update: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        let { productName, productUrl, productPrice } = req.body;
        
        db.update_product([id, productName, productUrl, productPrice])
            .then(() => res.redirect('/'))
            .catch(err => console.log('Err in update', err));
    }
}