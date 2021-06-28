import bcrypt from 'bcrypt';
import sequelize from '../imports/DB.js';
import DBAuth from '../imports/DBAuth';

/**
 * ExampleController
 */
class BaseController{

    constructor(){
        this.sequelize = sequelize;
        this.bcrypt = bcrypt;
        this.dbAuthRedisClient = DBAuth;
    }
   
}
//Get list with all roles

module.exports = BaseController;
