import BaseService from './BaseService';
import TypeTransportController from '../controllers/TypeTransportController';
const path = require('path');

/**
 * Services for app web
 */

class TypeTransportService extends BaseService{

    constructor(){
        super();
        this.typeTransportController = new TypeTransportController;
    }

    async createTypeTransport(req, res){
        try{
            var validator = await this.validatorModels.validateTypeTransport(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var typeTransport = await this.typeTransportController.createTypeTransport( 
                req.params.idstop, //Origin or destination
                req.body.indications,
                req.body.typeTransport
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).typeTransport_created,
                "typeTransport": typeTransport
            });
        }
        catch(err){
            this.logger.error("createTypeTransport@TypeTransportService "+ JSON.stringify(err)+err);
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async updateTypeTransport(req, res){
        try{
            var validator = await this.validatorModels.validateTypeTransport(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var typeTransport = await this.typeTransportController.updateTypeTransport(
                req.body.idtypetransport, 
                req.body.typeTransport,
                req.body.indications
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).typeTransport_updated,
                "typeTransport": typeTransport
            });
        }
        catch(err){
            this.logger.error("updateTypeTransport@TypeTransportService "+ JSON.stringify(err)+err);
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }

    async deleteTypeTransport(req, res){
        try{
            await this.typeTransportController.deleteTypeTransport(req.params.idtypetransport);
            res.status(201).json({"ok":JSON.parse(process.env.success).typeTransport_deleted});
        }
        catch(err){
            this.logger.error("deleteTypeTransport@TypeTransportService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = TypeTransportService;
