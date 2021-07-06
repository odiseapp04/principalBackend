import BaseService from './BaseService';
import AdventureController from '../controllers/AdventureController';
const path = require('path');

/**
 * Services for app web
 */
class AdventureService extends BaseService{

    constructor(){
        super();
        this.adventureController = new AdventureController;
    }

    async getAdventure(req, res){
        try{
            let adventures = await this.adventureController.getAdventure(req.params.idadventure || 0);
            res.status(200).json(adventures);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async getAdventureWithInfo(req, res){
        try{
            let adventures = await this.adventureController.getAdventureWithInfo(req.params.idadventure || 0);
            res.status(200).json(adventures);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async getAdventures(req, res){
        try{
            let adventures = await this.adventureController.getAdventures(req.query.page || 0);
            res.status(200).json(adventures);
        }
        catch(err){
            this.logger.error("getAdventures@AdventureService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async getAdventuresFiltered(req, res){
        try{
            let adventures;
            if(req.query.filter == "and"){
                adventures = await this.adventureController.getAdventuresByFilterAnd(req.body.adventureSource, req.body.adventureDestination, req.query.page || 0)
                res.status(200).json(adventures);
            }
            else if(req.query.filter == "or"){
                adventures = await this.adventureController.getAdventuresSearch(req.query.params, req.query.page || 0);
                res.status(200).json(adventures);
            }
        }
        catch(err){
            this.logger.error("getAdventures@AdventureService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async createAdventure(req, res){
        try{
            var validator = await this.validatorModels.validateAdventure(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let adventure = await this.adventureController.createAdventure(
                req.body.iduser, 
                req.body.nameAdventure,
                req.body.transports, 
                req.body.generalInfo, 
                req.body.citySource, 
                req.body.countrySource,
                req.body.cityDestination, 
                req.body.countryDestination,
                req.body.adventureSource,
                req.body.adventureDestination,
                req.body.distance,
                req.body.totalCost,
                req.body.price,
                req.body.bestPhoto,
                req.body.typeTravel,
                req.body.durationDays,
                req.body.isVisible,
                req.body.baggage,
                req.body.weather
            );
            res.status(201).json(
                {
                    "ok":JSON.parse(process.env.success).adventure_created,
                    "adventure": adventure
                }
            );
        }
        catch(err){
            this.logger.error("createAdventure@AdventureService "+ JSON.stringify(err));
            res.status(500).json({
                "message":JSON.parse(process.env.errors).internal_server_error,
                error: err
            });
        }
    }

    async updateAdventure(req, res){
        try{
            var validator = await this.validatorModels.validateAdventure(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let adventure = await this.adventureController.updateAdventure(
                req.body.idadventure,
                req.body.nameAdventure,
                req.body.transports, 
                req.body.generalInfo, 
                req.body.citySource, 
                req.body.countrySource,
                req.body.cityDestination, 
                req.body.countryDestination,
                req.body.adventureSource,
                req.body.adventureDestination,
                req.body.distance,
                req.body.totalCost,
                req.body.price,
                req.body.bestPhoto,
                req.body.typeTravel,
                req.body.durationDays,
                req.body.isVisible,
                req.body.baggage,
                req.body.weather
            );
            res.status(201).json(
            {
                "ok":JSON.parse(process.env.success).adventure_updated,
                "adventure": adventure
            });
        }
        catch(err){
            this.logger.error("updateAdventure@AdventureService "+ JSON.stringify(err)+err);
            res.status(500).json({
                "message":JSON.parse(process.env.errors).internal_server_error,
                error: err
            });
        }
    }

    async deleteAdventure(req, res){
        try{
            await this.adventureController.deleteAdventure(req.params.idadventure);
            res.status(201).json({"ok":JSON.parse(process.env.success).adventure_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async setTags(req, res){
        try{
            await this.adventureController.setTags(req.params.idadventure, req.body.tags);
            res.status(201).json({"ok":JSON.parse(process.env.success).adventure_tag_created});
        }
        catch(err){
            this.logger.error("setTags@AdventureService "+ JSON.stringify(err)+err);
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }
}

module.exports = AdventureService;
