import BaseController from './BaseController';
import StopPhone from '../models/StopPhone';

/**
 * StopPhoneController
 */
class StopPhoneController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List StopPhones
     */
    async getStopPhones(){
        try{
            let stopPhones = await StopPhone.findAll();
            return stopPhones;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create StopPhone with required params
     */
    async createStopPhone(pidstop, pstopphone, pcomment){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let stopPhone = await StopPhone.create({
                idstop:pidstop,
                telephone:pstopphone,
                comment: pcomment
            }, {transaction: transaction})

            await transaction.commit();
            return stopPhone;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Update StopPhone with required params
     */
    async updateStopPhone(pidstopphone, pstopphone, pcomment){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let stopPhone = await StopPhone.update({
                telephone:pstopphone,
                comment: pcomment
            }, 
            {where: {idstopphone: pidstopphone}}, {transaction: transaction});
            await transaction.commit();
            return stopPhone;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Delete StopPhone by id
     * @param {*} pidstopphone 
     */
    async deleteStopPhone(pidstopphone){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await StopPhone.destroy({ where: { idstopphone: pidstopphone } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Get StopPhone by id 
     * @param {*} pidstopphone 
     */
    async getStopPhone(pidstopphone){
        try{
            let stopPhone = await StopPhone.findByPk(pidstopphone);
            return stopPhone;
        }
        catch(err){
            throw err;
        }
    }
    
}

module.exports = StopPhoneController;