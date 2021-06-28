import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Stop
var TypeTransport = sequelize.define('TypeTransport', {
    idtypetransport: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstopSource: {
        type: Sequelize.INTEGER,
        unique: true
    },
    idstopDestination: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    typeTransport: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = TypeTransport;
