const knex = require("knex");

const knexConnection = knex({
    client: "sqlite3",
    connection: {
        filename: "./db/db.sqlite3"
    },
    useNullAsDefault: true
});

module.exports = knexConnection;