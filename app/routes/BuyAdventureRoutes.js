import express from 'express';
import BuyAdventureService from '../services/BuyAdventureService';

const router = express.Router()
const buyAdventureService = new BuyAdventureService;

//Upload image for user
router.put('/create', (req, res) => { buyAdventureService.createBuyAdventure(req, res) });
router.get('/:iduser/list', (req, res) => { buyAdventureService.getBuyAdventures(req, res) });
router.get('/:idbuyadventure', (req, res) => { buyAdventureService.getBuyAdventure(req, res) });
router.get('/:iduser/buyadventure/:idadventure', (req, res) => { buyAdventureService.getBuyAdventureByIds(req, res) });
router.get('/payment/:price', (req, res) => { buyAdventureService.getTotalPaymentPrice(req, res) });

module.exports = router
