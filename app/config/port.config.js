/* globals process */
// eslint-disable-next-line no-process-env
const port = process.env.PORT || 300112233321;
const connectionString = 'mongodb://localhost/blogging-db';

module.exports = {
    port,
    connectionString,
};
