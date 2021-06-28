import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Adventure
var Adventure = sequelize.define('Adventures', {
    idadventure: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nameAdventure: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    transports: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    generalInfo: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    citySource: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    countrySource: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    cityDestination: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    countryDestination: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    adventureSource: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    adventureDestination: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    distance: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    totalCost: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    bestPhoto: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    typeTravel: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    durationDays: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isVisible: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    baggage: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    weather: {
        type: Sequelize.STRING(50),
        allowNull: true
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = Adventure;

