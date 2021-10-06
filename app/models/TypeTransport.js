import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Stop
var TypeTransport = sequelize.define('TypeTransport', {
    idtypetransport: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstop: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    typeTransport: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    indications: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = TypeTransport;
