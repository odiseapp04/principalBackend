import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Stop
var StopImage = sequelize.define('StopsImages', {
    idstopimage: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstop: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = StopImage;

