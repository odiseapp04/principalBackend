import BaseController from './BaseController';
import UserController from './UserController';
import BuyAdventure from '../models/BuyAdventure';
import Adventure from '../models/Adventure';

/**
 * AdventureController
 */
class BuyAdventureController extends BaseController{
    
    constructor(){
        super();
        this.userController = new UserController;
    }

    /**
     * Get BuyAdventure by id 
     * @param {*} idadventure 
     */
    async getBuyAdventure(idbuyadventure){
        try{
            let buyAdventure = await BuyAdventure.findByPk(idbuyadventure);
            return buyAdventure;
        }
        catch(err){
            throw err;
        }
    }


    /**
     * This method return the adventures bought for a user
     */
    async getBuyAdventures(piduser, ppage){
        try{
            let buyAdventures = await BuyAdventure.findAll({
                where: { iduser: piduser },
                offset: ( 10*ppage ),
                limit: 10,
                include: ["boughtAdventure"]
            });

            return buyAdventures;
        }
        catch(err){
            throw err;
        }
    }

    async getBuyAdventureByIds(piduser, pidadventure){
        try{
            let adventures = await BuyAdventure.findAll({ 
                where: { iduser: piduser, idadventure: pidadventure }
            });
            return adventures;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create buyAdventure with require 
     */
    async createBuyAdventure(piduser, pidadventure, pwaytopay, pstate, pcodeFacturation )
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let buyAdventure = await BuyAdventure.create({
                iduser: piduser,
                idadventure: pidadventure,
                waytopay: pwaytopay,
                state: pstate,
                codeFacturation: pcodeFacturation
            }, {transaction: transaction})

            await transaction.commit();
            
            return buyAdventure;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async getPaymentPrice( query ) {
        try {
            let adventure;
            let price = 0;
            const { ids } = query;
            const idsArray = JSON.parse(ids);

            for (let i = 0; i < idsArray.length; i++) {
                adventure = await Adventure.findByPk(idsArray[i]);
                price += adventure.price;
            }

            return price;
        }
        catch(err) {
            throw err;
        }
    }

}

//Exports-------------------------------------
module.exports = BuyAdventureController;