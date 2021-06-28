import BaseController from './BaseController';
import Card from '../models/Card';

/**
 * CardController
 */
class CardController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List Users
     */
    async getCards(iduser){
        try{
            let cards = await Card.findAll({where: { iduser: iduser}});
            return cards;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create Card with required params
     */
    async createCard(piduser, pnumbercard, pverificationCode, pnameUserCard, pexpiredDate, ptypeCard){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let card = await Card.create({
                iduser:piduser,
                numberCard:pnumbercard,
                verificationCode:pverificationCode,
                nameUserCard:pnameUserCard,
                expiredDate:pexpiredDate,
                typeCard:ptypeCard
            }, {transaction: transaction})

            await transaction.commit();
            return card;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Update Card with required params
     */
    async updateCard(pidcard, pnumbercard, pverificationCode, pnameUserCard, pexpiredDate, ptypeCard){
        let transaction;
        try{
            let card = await Card.update({
                numberCard:pnumbercard,
                verificationCode:pverificationCode,
                nameUserCard:pnameUserCard,
                expiredDate:pexpiredDate,
                typeCard:ptypeCard
            }, {where: {idcard: pidcard}}, {transaction: transaction});
            await transaction.commit();
            return card;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Delete card by id
     * @param {*} idcard 
     */
    async deleteCard(idcard){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Card.destroy({ where: { idcard: idcard } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Get card by id 
     * @param {*} idcard 
     */
    async getCard(idcard){
        try{
            let cardRes = await Card.findByPk(idcard);
            return cardRes;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Get card by iduser 
     * @param {*} idcard 
     */
    async getCardByUser(piduser){
        try{
            let cardRes = await Card.findAll({where:{iduser: piduser}})
            return cardRes;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = CardController;