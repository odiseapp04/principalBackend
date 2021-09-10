import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Stop
var Stop = sequelize.define('Stops', {
    idstop: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idadventure: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nameStop:{
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    nameLocationStop:{
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    latitude: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    longitude: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    cost: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    wheather: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isPointStart: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = Stop;

