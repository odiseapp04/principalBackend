import BaseService from './BaseService';
import TagController from '../controllers/TagController';
const path = require('path');

/**
 * Services for app web
 */

class TagService extends BaseService{

    constructor(){
        super();
        this.tagController = new TagController;
    }

    async createTag(req, res){
        try{
            var validator = await this.validatorModels.validateTag(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var tag = await this.tagController.createTag(
                req.body.name, 
                req.body.description,
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).tag_created,
                "tag": tag
            });
        }
        catch(err){
            this.logger.error("createTag@TagService "+ JSON.stringify(err)+err);
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async updateTag(req, res){
        try{
            var validator = await this.validatorModels.validateTag(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var tag = await this.tagController.updateCaution(
                req.body.idtag, 
                req.body.name,
                req.body.description
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).tag_updated,
                "tag": tag
            });
        }
        catch(err){
            this.logger.error("updateTag@TagService "+ JSON.stringify(err)+err);
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }

    async deleteTag(req, res){
        try{
            await this.tagController.deleteTag(req.params.idtag);
            res.status(201).json({"ok":JSON.parse(process.env.success).tag_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async listTag(req, res){
        try{
            let tags = await this.tagController.getTags(req.query.page || 0);
            res.json(tags);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async listTagsByNames(req, res){
        try{
            let tags = await this.tagController.getTagsByNames(req.body.names);
            res.json(tags);
        }
        catch(err){
            this.logger.error("listTagsByNames@TagService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = TagService;
