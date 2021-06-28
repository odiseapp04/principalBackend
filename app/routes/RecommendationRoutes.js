import express from 'express';
import RecommendationService from '../services/RecommendationService';

const router = express.Router()
const recommendationService = new RecommendationService;

//Routes of recommendations
router.put('/:idadventure/stop/:idstop/recommendation/create', (req, res) => { recommendationService.createRecommendation(req, res) });
router.put('/:idadventure/stop/:idstop/recommendation/update', (req, res) => { recommendationService.updateRecommendation(req, res) });
router.delete('/:idadventure/stop/:idstop/recommendation/:idrecommendation', (req, res) => { recommendationService.deleteRecommendation(req, res) });

module.exports = router