import Sequelize from 'sequelize';
import sequelize from '../imports/DB.js';

// Model Adventure
var BankAccount = sequelize.define('BankAccounts', {
    idbankaccount: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    iduser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numberAccount: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    nameUser: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    nameBank: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},{
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
});

// export User model for use in other files.
module.exports = BankAccount;

