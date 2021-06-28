import BaseController from './BaseController';
import UserController from './UserController';
import AdventureQualify from '../models/AdventureQualify';

/**
 * AdventureController
 */
class AdventureQualifyController extends BaseController{
    
    constructor(){
        super();
        this.userController = new UserController;
    }

    /**
     * Get AdventureQualify by id 
     * @param {*} idadventurequalify 
     */
    async getAdventureQualify(idadventurequalify){
        try{
            let adventureQualify = await AdventureQualify.findByPk(idbuyadventure);
            return adventureQualify;
        }
        catch(err){
            throw err;
        }
    }


    /**
     * This method return the 
     */
    async getAdventuresQualifies(iduser, page){
        try{
            let adventuresQualifies = await AdventureQualify.findAll({where:{iduser: iduser}, offset: (10*page), limit: 10});
            return adventuresQualifies;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create AdventureQualify with require 
     */
    async createAdventureQualify(piduser, pidadventure, pqualify )
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let adventureQualify = await AdventureQualify.create({
                iduser: piduser,
                idadventure: pidadventure,
                qualify: pqualify
            }, {transaction: transaction})

            await transaction.commit();
            
            return adventureQualify;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

}

//Exports-------------------------------------
module.exports = AdventureQualifyController;