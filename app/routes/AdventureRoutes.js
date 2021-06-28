import express from 'express';
import AdventureService from '../services/AdventureService';

const router = express.Router()
const adventureService = new AdventureService;

//Upload image for user
router.post('', (req, res) => { adventureService.getAdventuresFiltered(req, res) });
router.get('/list', (req, res) => { adventureService.getAdventures(req, res) });
router.put('/create', (req, res) => { adventureService.createAdventure(req, res) });
router.put('/update', (req, res) => { adventureService.updateAdventure(req, res) });
router.delete('/:idadventure', (req, res) => { adventureService.deleteAdventure(req, res) });
router.get('/:idadventure', (req, res) => { adventureService.getAdventure(req, res) });
router.get('/:idadventure/info', (req, res) => { adventureService.getAdventureWithInfo(req, res) });
router.put('/:idadventure/tags', (req, res) => { adventureService.setTags(req, res) });

module.exports = router
