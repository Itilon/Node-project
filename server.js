/* eslint-disable no-console */
const { port, connectionString } = require('./app/config/port.config');

const async = () => {
    return Promise.resolve();
};

async()
        .then(() => require('./db')(connectionString))
        .then((db) => require('./data')(db))
        .then((data) => require('./app')(data))
        .then((app) => {
            app.listen(port, () => console.log(`Server starts at :${port}`));
        });
