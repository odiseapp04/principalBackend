import BaseService from './BaseService';
import RecommendationController from '../controllers/RecommendationController';
const path = require('path');

/**
 * Services for app web
 */

class RecommendationService extends BaseService{

    constructor(){
        super();
        this.recommendationController = new RecommendationController;
    }

    async createRecommendation(req, res){
        try{
            var validator = await this.validatorModels.validateRecommendation(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var recommendation = await this.recommendationController.createRecommendation(
                req.params.idstop, 
                req.body.recommendation
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).recommendation_created,
                "recommendation": recommendation
            });
        }
        catch(err){
            this.logger.error("createRecommendation@RecommendationService "+ JSON.stringify(err)+err);
            res.status(500).json({
                message: JSON.parse(process.env.errors).internal_server_error, 
                error: err
            });
        }
    }

    async updateRecommendation(req, res){
        try{
            var validator = await this.validatorModels.validateRecommendation(req.body);
            var check = await validator.check();    
            if(!check)
                res.status(400).json({"error":validator.errors});
            var recommendation = await this.recommendationController.updateRecommendation(
                req.body.idrecommendation, 
                req.body.recommendation
            );
            res.status(201).json({
                "ok":JSON.parse(process.env.success).recommendation_updated,
                "recommendation": recommendation
            });
        }
        catch(err){
            this.logger.error("updateRecommendation@RecommendationService "+ JSON.stringify(err)+err);
            res.status(500).json({
        message: JSON.parse(process.env.errors).internal_server_error, 
        error: err
    });
        }
    }

    async deleteRecommendation(req, res){
        try{
            await this.recommendationController.deleteRecommendation(req.params.idrecommendation);
            res.status(201).json({"ok":JSON.parse(process.env.success).recommendation_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = RecommendationService;
