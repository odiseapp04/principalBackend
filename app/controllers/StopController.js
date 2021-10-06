import BaseController from './BaseController';
import Stop from '../models/Stop';
import StopImage from '../models/StopImage';

/**
 * StopController
 */
class StopController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Get Stop by id 
     * @param {*} idstop 
     */
    async getStop(idstop){
        try{
            let stop = await Stop.findByPk(idstop, {include: ["images", "recommendations", "cautions", "stopPhones", "typeTransport"]});
            return stop;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Return List Stops
     */
    async getStops(page){
        try{
            let stops = await Stop.findAll({ offset: (10*page), limit: 10 }, {include: ["images"]});
            return stops;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create Stop with required params
     */
    async createStop(pidadventure, pnameStop, pnameLocationStop, platitude, plongitude, pdescription,
        pcost, pwheather, porder, pisPointStart)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let stop = await Stop.create({
                idadventure: pidadventure,
                nameStop: pnameStop,
                nameLocationStop: pnameLocationStop,
                latitude: platitude,
                longitude: plongitude,
                description: pdescription,
                cost: pcost,
                wheather: pwheather,
                order: porder,
                isPointStart: pisPointStart
            }, {transaction: transaction})

            await transaction.commit();
            return stop;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Delete Stop by id
     * @param {*} pidstop 
     */
    async deleteStop(pidstop){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Stop.destroy({ where: { idstop: pidstop } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Update Stop by id with required params
     */
    async updateStop(pidstop, pnameStop, pnameLocationStop, platitude, plongitude, pdescription,
        pcost, pwheather, porder, pisPointStart)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            await Stop.update({
                nameStop: pnameStop,
                nameLocationStop: pnameLocationStop,
                latitude: platitude,
                longitude: plongitude,
                description: pdescription,
                cost: pcost,
                wheather: pwheather,
                order: porder,
                isPointStart: pisPointStart
            },{where : {idstop:pidstop}}, {transaction: transaction})

            var stop = this.getStop(pidstop);
            await transaction.commit();
            return stop;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async setImage(pidstop, pname){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await StopImage.create({
                idstop: pidstop,
                name: pname
            }, {transaction: transaction})   
                    
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async deleteImage(pidstopimage){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await StopImage.destroy({ where: { idstopimage: pidstopimage } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async deleteAllImages(pidstop){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await StopImage.destroy({ where: { idstop: pidstop } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

}

//Exports-------------------------------------
module.exports = StopController;