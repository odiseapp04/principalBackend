const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
        "ssl": true
    },
    // logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
  
//Connection Test
db.authenticate()
.then(() => {
    console.log('Connection with DB has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db;