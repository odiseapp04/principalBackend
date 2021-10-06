import BaseController from './BaseController';
import UserController from './UserController';
import Adventure from '../models/Adventure';
import Stop from '../models/Stop';
import AdventureTag from '../models/AdventureTag';
import Sequelize from 'sequelize';

/**
 * AdventureController
 */
class AdventureController extends BaseController{
    
    constructor(){
        super();
        this.userController = new UserController;
        const Op = Sequelize.Op;
    }

    /**
     * Get Adventure by id 
     * @param {*} idadventure 
     */
    async getAdventure(idadventure){
        try{
            let adventure = await Adventure.findByPk(idadventure, {include: ["user"]});
            //Serialize the user
            adventure.user = await this.userController.serializeUser(adventure.user);
            return adventure;
        }
        catch(err){
            throw err;
        }
    }

     /**
     * Get Adventure by id 
     * @param {*} idadventure 
     */
    async getAdventureWithInfo(idadventure){
        try{
            let adventure = await Adventure.findByPk(idadventure, {include: [
                "user",
                {
                    model: Stop,
                    as: 'stops',
                    include: ['images', 'recommendations', 'cautions', 'stopPhones', 'typeTransport']
                }
            ],
            order: [
                [{ model: Stop, as: 'stops' }, 'createdAt', 'asc']
            ]
        });
            //Serialize the user
            adventure.user = await this.userController.serializeUser(adventure.user);
            return adventure;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Return List Adventures
     */
    async getAdventures(page){
        try{
            let adventures = await Adventure.findAll({ offset: (10*page), limit: 10, include: ["user"], order:[['idadventure','desc']]});
            adventures = adventures.map(adventure => {
                adventure.user = this.userController.serializeUser(adventure.user);
                return adventure;
            });
            return adventures;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create Adventure with require 
     */
    async createAdventure(piduser, pnameAdventure, ptransports, pgeneralInfo, pcitySource, pcountrySource,
        pcityDestination, pcountryDestination, pAdventureSource, pAdventureDestination, pdistance, ptotalCost, pprice, pbestPhoto,
        ptypeTravel, pdurationDays, pisVisible, pbaggage, pweather )
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let adventure = await Adventure.create({
                iduser: piduser,
                nameAdventure: pnameAdventure,
                transports: ptransports,
                generalInfo: pgeneralInfo,
                citySource: pcitySource,
                countrySource: pcountrySource,
                cityDestination: pcityDestination,
                countryDestination: pcountryDestination,
                adventureSource: pAdventureSource,
                adventureDestination: pAdventureDestination,
                distance: pdistance,
                totalCost: ptotalCost,
                price: pprice,
                bestPhoto: pbestPhoto,
                typeTravel: ptypeTravel,
                durationDays: pdurationDays,
                isVisible: pisVisible,
                baggage: pbaggage,
                weather: pweather
            }, {transaction: transaction})

            await transaction.commit();
            return adventure;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Delete Adventure by id
     * @param {*} pidadventure 
     */
    async deleteAdventure(pidadventure){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Adventure.destroy({ where: { idadventure: pidadventure } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Update Adventure by id with required params
     */
    async updateAdventure(pidadventure, pnameAdventure, ptransports, pgeneralInfo, pcitySource, pcountrySource,
        pcityDestination, pcountryDestination, pAdventureSource, pAdventureDestination, pdistance, ptotalCost, pprice, pbestPhoto,
        ptypeTravel, pdurationDays, pisVisible, pbaggage, pweather )
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            await Adventure.update({
                nameAdventure: pnameAdventure,
                transports: ptransports,
                generalInfo: pgeneralInfo,
                citySource: pcitySource,
                countrySource: pcountrySource,
                cityDestination: pcityDestination,
                countryDestination: pcountryDestination,
                adventureSource: pAdventureSource,
                adventureDestination: pAdventureDestination,
                distance: pdistance,
                totalCost: ptotalCost,
                price: pprice,
                bestPhoto: pbestPhoto,
                typeTravel: ptypeTravel,
                durationDays: pdurationDays,
                isVisible : pisVisible,
                baggage: pbaggage,
                weather: pweather
            },{where : {idadventure:pidadventure}}, {transaction: transaction})

            var adventure = await this.getAdventure(pidadventure);
            await transaction.commit();

            return adventure;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }


    async setTags(pidadventure, tags){
        let transaction;
        try{
            for(let tag of tags){
                await AdventureTag.create({
                    idadventure: pidadventure,
                    idtag: tag
                })
            }
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async getAdventureByUser(iduser, page){
        try{
            let adventures = await Adventure.findAll({ 
                where: { iduser: iduser },
                offset: (10*page), limit: 10,
                order:[['idadventure','desc']]
            });
            return adventures;
        }
        catch(err){
            throw err;
        }
    }

    async getAdventuresByFilterAnd(adventureSource, adventureDestination, page){
        try{
            let adventures = await Adventure.findAll({
                where: {adventureSource: adventureSource, adventureDestination: adventureDestination},
                offset: (10*page), limit: 10,
                order:[['idadventure','desc']]
            });
            return adventures;
        }
        catch(err){
            throw err;
        }
    }

    async getAdventuresByFilterOr(tags, page){
        try{
            let adventureTags = await AdventureTag.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('idadventure')) ,'idadventure'],
                ],
                where: {
                    idtag:{
                        [Sequelize.Op.or]: tags
                    }     
                }
            }).map((adventureTag)=>{return adventureTag.idadventure});
            let adventures = await Adventure.findAll({
                where: {
                    idadventure:{
                        [Sequelize.Op.or]: adventureTags
                    }     
                },
                offset: (10*page), limit: 10,
            })
            return adventures;
        }
        catch(err){
            throw err;
        }
    }
}


//Exports-------------------------------------
module.exports = AdventureController;