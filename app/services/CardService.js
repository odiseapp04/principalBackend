import BaseService from './BaseService';
import CardController from '../controllers/CardController';
const path = require('path');

/**
 * Services for app web
 */

class CardService extends BaseService{

    constructor(){
        super();
        this.cardController = new CardController;
    }

    async getCards(req, res){
        try{
            let payload = req.payload.data;
            let cards = await this.cardController.getCards(payload.iduser);
            res.status(200).json(cards);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async createCard(req, res){
        try{
            var validator = await this.validatorModels.validateCard(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            await this.cardController.createCard(
                req.body.iduser, 
                req.body.numberCard, 
                req.body.verificationCode, 
                req.body.nameUserCard, 
                req.body.expiredDate,
                req.body.typeCard
            );
            res.status(201).json({"ok":JSON.parse(process.env.success).card_created});
        }
        catch(err){
            this.logger.error("createCard@CardService "+ JSON.stringify(err));
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async updateCard(req, res){
        try{
            var validator = await this.validatorModels.validateCard(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            await this.cardController.updateCard(
                req.body.idcard, 
                req.body.numberCard, 
                req.body.verificationCode, 
                req.body.nameUserCard, 
                req.body.expiredDate,
                req.body.typeCard
            );
            res.status(201).json({"ok":JSON.parse(process.env.success).card_updated});
        }
        catch(err){
            this.logger.error("createCard@CardService "+ JSON.stringify(err));
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }

    async deleteCard(req, res){
        try{
            await this.cardController.deleteCard(req.params.idcard);
            res.status(201).json({"ok":JSON.parse(process.env.success).card_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = CardService;
