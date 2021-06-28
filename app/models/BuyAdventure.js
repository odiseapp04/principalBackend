import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model BuyAdventure
var BuyAdventure = sequelize.define('BuyAdventure', {
    idbuyadventure: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
    },
    idadventure: {
        type: Sequelize.INTEGER,
    },
    waytopay: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    codeFacturation: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export BuyAdventure model for use in other files.
module.exports = BuyAdventure;
