import BaseController from './BaseController';
import Caution from '../models/Caution';

/**
 * CautionController
 */
class CautionController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List Cautions
     */
    async getCautions(){
        try{
            let cautions = await Caution.findAll();
            return cautions;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create Caution with required params
     */
    async createCaution(pidstop, pdescription, plevel){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let caution = await Caution.create({
                idstop:pidstop,
                description: pdescription,
                level:plevel
            }, {transaction: transaction})

            await transaction.commit();
            return caution;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Update Caution with required params
     */
    async updateCaution(pidcaution, pdescription, plevel){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let caution = await Caution.update({
                description: pdescription,
                level:plevel
            }, 
            {where: {idcaution: pidcaution}}, {transaction: transaction});
            await transaction.commit();
            return caution;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Delete Caution by id
     * @param {*} pidrecommendation 
     */
    async deleteCaution(pidcaution){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Caution.destroy({ where: { idcaution: pidcaution } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Get Caution by id 
     * @param {*} recommendation 
     */
    async getCaution(pidcaution){
        try{
            let caution = await Caution.findByPk(pidcaution);
            return caution;
        }
        catch(err){
            throw err;
        }
    }

    
}

module.exports = CautionController;