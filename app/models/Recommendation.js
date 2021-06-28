import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Recommendation
var Recommendation = sequelize.define('Recommendation', {
    idrecommendation: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    idstop: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    recommendation: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = Recommendation;
