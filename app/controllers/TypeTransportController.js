import BaseController from './BaseController';
import TypeTransport from '../models/TypeTransport';

/**
 * TypeTransportController
 */
class TypeTransportController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List recommendations
     */
    async getTypeTransports(){
        try{
            let transports = await TypeTransport.findAll();
            return transports;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create typeTransport with required params
     */
    async createTypeTransport(pidstop, pindications, ptypeTransport){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let typeTransport = await TypeTransport.create({
                idstop: pidstop,
                indications: pindications,
                typeTransport: ptypeTransport
            }, {transaction: transaction})

            await transaction.commit();
            return typeTransport;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Update TypeTransport with required params
     */
    async updateTypeTransport(idtypetransport, ptypeTransport, pindications){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let typeTransport = await TypeTransport.update({
                typeTransport: ptypeTransport,
                indications: pindications
            }, 
            {where: {idtypetransport: idtypetransport}}, {transaction: transaction});
            await transaction.commit();
            return typeTransport;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Delete TypeTransport by id
     * @param {*} pidtypetransport 
     */
    async deleteTypeTransport(pidtypetransport){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await TypeTransport.destroy({ where: { idtypetransport: pidtypetransport } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
}

module.exports = TypeTransportController;