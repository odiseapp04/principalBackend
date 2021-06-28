import express from 'express';
import CardService from '../services/CardService';

const router = express.Router()
const cardService = new CardService;

//Routes of card
router.get('/', (req, res) => { cardService.getCards(req, res) });
router.put('/create', (req, res) => { cardService.createCard(req, res) });
router.put('/update', (req, res) => { cardService.updateCard(req, res) });
router.delete('/delete/:idcard', (req, res) => { cardService.deleteCard(req, res) });

module.exports = router