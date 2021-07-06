import BaseService from './BaseService';
import StopPhoneController from '../controllers/StopPhoneController';
const path = require('path');

/**
 * Services for app web
 */

class StopPhoneService extends BaseService{

    constructor(){
        super();
        this.stopPhoneController = new StopPhoneController;
    }

    async createStopPhone(req, res){
        try{
            var validator = await this.validatorModels.validateStopPhone(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var stopphone = await this.stopPhoneController.createStopPhone(
                req.params.idstop, 
                req.body.telephone,
                req.body.comment
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).stopphone_created,
                "stopphone": stopphone
            });
        }
        catch(err){
            this.logger.error("createStopPhone@StopPhoneService "+ JSON.stringify(err)+err);
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async updateStopPhone(req, res){
        try{
            var validator = await this.validatorModels.validateStopPhone(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var stopphone = await this.stopPhoneController.updateStopPhone(
                req.body.idstopphone,
                req.body.telephone,
                req.body.comment
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).stopphone_updated,
                "stopphone": stopphone
            });
        }
        catch(err){
            this.logger.error("updateStopPhone@StopPhoneService "+ JSON.stringify(err)+err);
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }

    async deleteStopPhone(req, res){
        try{
            await this.stopPhoneController.deleteStopPhone(req.params.idstopphone);
            res.status(201).json({"ok":JSON.parse(process.env.success).stopphone_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = StopPhoneService;
