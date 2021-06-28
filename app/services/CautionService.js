import BaseService from './BaseService';
import CautionController from '../controllers/CautionController';
const path = require('path');

/**
 * Services for app web
 */

class CautionService extends BaseService{

    constructor(){
        super();
        this.cautionController = new CautionController;
    }

    async createCaution(req, res){
        try{
            var validator = await this.validatorModels.validateCaution(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var caution = await this.cautionController.createCaution(
                req.params.idstop, 
                req.body.description,
                req.body.level
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).caution_created,
                "caution": caution
            });
        }
        catch(err){
            this.logger.error("createCaution@CautionService "+ JSON.stringify(err)+err);
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async updateCaution(req, res){
        try{
            var validator = await this.validatorModels.validateCaution(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var caution = await this.cautionController.updateCaution(
                req.body.idcaution, 
                req.body.description,
                req.body.level
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).caution_updated,
                "caution": caution
            });
        }
        catch(err){
            this.logger.error("updateCaution@CautionService "+ JSON.stringify(err)+err);
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async deleteCaution(req, res){
        try{
            await this.cautionController.deleteCaution(req.params.idcaution);
            res.status(201).json({"ok":JSON.parse(process.env.success).caution_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = CautionService;
