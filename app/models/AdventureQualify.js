import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model AdventureQualify
var AdventureQualify = sequelize.define('AdventuresQualifies', {
    idadventurequalify: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER
    },
    idadventure: {
        type: Sequelize.INTEGER
    },
    qualify: {
        type: Sequelize.STRING(2),
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export AdventureQualify model for use in other files.
module.exports = AdventureQualify;
