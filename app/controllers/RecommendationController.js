import BaseController from './BaseController';
import Recommendation from '../models/Recommendation';

/**
 * RecommendationController
 */
class RecommendationController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List recommendations
     */
    async getRecommendations(){
        try{
            let recommendations = await Recommendation.findAll();
            return recommendations;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create recommendation with required params
     */
    async createRecommendation(pidstop, precommendation){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let recommendation = await Recommendation.create({
                idstop:pidstop,
                recommendation:precommendation
            }, {transaction: transaction})

            await transaction.commit();
            return recommendation;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Update Recommendation with required params
     */
    async updateRecommendation(pidrecommendation, precommendation){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let recommendation = await Recommendation.update({
                recommendation:precommendation
            }, 
            {where: {idrecommendation: pidrecommendation}}, {transaction: transaction});
            await transaction.commit();
            return recommendation;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Delete Recommendation by id
     * @param {*} pidrecommendation 
     */
    async deleteRecommendation(pidrecommendation){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Recommendation.destroy({ where: { idrecommendation: pidrecommendation } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Get recommendation by id 
     * @param {*} recommendation 
     */
    async getRecommendation(pidrecommendation){
        try{
            let recommendation = await Recommendation.findByPk(pidrecommendation);
            return recommendation;
        }
        catch(err){
            throw err;
        }
    }

    
}

module.exports = RecommendationController;