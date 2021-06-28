import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model StopPhone
var StopPhone = sequelize.define('StopPhones', {
    idstopphone: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstop: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    telephone: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = StopPhone;
