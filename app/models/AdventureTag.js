import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Card
var AdventureTag = sequelize.define('AdventureTags', {
    idadventure: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idtag: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export Card model for use in other files.
module.exports = AdventureTag;

