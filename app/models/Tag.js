import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Tag
var Tag = sequelize.define('Tags', {
    idtag: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING(255),
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = Tag;

