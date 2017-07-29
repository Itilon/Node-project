const { Router } = require('express');

// const items = [{
//     id: 1,
//     name: 'Pesho',
// }];

const attach = (app, data) => {
    const router = new Router();
    router
        .get('/categories', (req, res) => {
            return data.categories.getAll()
                .then((cats) => {
                    return res.send(cats);
                });
        });

    //     .get('/:id', (req, res) => {
    //         const id = parseInt(req.params.id, 10);
    //         const item = items.find((i) => i.id === id);
    //         if (!item) {
    //             return res
    //                 .status(404)
    //                 .send({
    //                     error: 'Page not found',
    //                 });
    //         }
    //         return res.send(item);
    //     })

    //     .get('/', (req, res) => {
    //         let { name, page, size } = req.query;
    //         let result = items;
    //         page = +page || 1;
    //         size = +size || 10;
    //         if (name) {
    //             name = name.toLowerCase();
    //             result = result.filter((item) => {
    //                 return item.name.toLowerCase().includes(name);
    //             });
    //         }
    //         result = result.slice((page - 1) * size, page * size);
    //         res.send(result);
    //     })

    //     .post('/', (req, res) => {
    //         const item = req.body;
    //         item.id = items.length + 1;
    //         items.push(item);
    //         res.status(201);
    //         res.send(true);
    //     });

    app.use('/api', router);
};

module.exports = attach;
