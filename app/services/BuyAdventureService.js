import BaseService from './BaseService';
import BuyAdventureController from '../controllers/BuyAdventureController';
const path = require('path');

/**
 * Services for app web
 */

class BuyAdventureService extends BaseService{

    constructor(){
        super();
        this.buyAdventureController = new BuyAdventureController;
    }

    async getBuyAdventure(req, res){
        try{
            let buyAdventures = await this.buyAdventureController.getBuyAdventure(req.params.idbuyadventure);
            res.status(200).json(buyAdventures);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async getBuyAdventures(req,res){
        try{
            let buyAdventures = await this.buyAdventureController.getBuyAdventures(req.params.iduser, req.query.page || 0);
            res.status(200).json(buyAdventures);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getBuyAdventureByIds(req, res){
        try{
            let buyAdventure = await this.buyAdventureController.getBuyAdventureByIds(req.params.iduser, req.params.idadventure);
            res.status(200).json(buyAdventure);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async createBuyAdventure(req, res){
        try{
            var validator = await this.validatorModels.validateBuyAdventure(req.body);
            var check = await validator.check();
            
            if(!check) res.status(400).json({"error":validator.errors});

            let buyAdventure = await this.buyAdventureController.createBuyAdventure(
                req.body.iduser, 
                req.body.idadventure,
                req.body.waytopay, 
                req.body.state, 
                req.body.codeFacturation
            );
            res.status(201).json(
                {
                    "ok":JSON.parse(process.env.success).buy_adventure_created,
                    "buyAdventure": buyAdventure
                }
            );
        }
        catch(err){
            this.logger.error("createBuyAdventure@BuyAdventureService "+ JSON.stringify(err));
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async getTotalPaymentPrice(req, res){
        try{
            let totalPaymentPrice = await this.buyAdventureController.getPaymentPrice(req.query);
            res.status(200).json(totalPaymentPrice);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
   
}

module.exports = BuyAdventureService;
