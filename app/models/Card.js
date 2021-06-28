import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Card
var Card = sequelize.define('Cards', {
    idcard: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numberCard: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    verificationCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nameUserCard: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    expiredDate:{
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    typeCard: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export Card model for use in other files.
module.exports = Card;

