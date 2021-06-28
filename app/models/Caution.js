import Sequelize, { STRING } from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Caution
var Caution = sequelize.define('Caution', {
    idcaution: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstop: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    level: {
        type: STRING(255),
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = Caution;
