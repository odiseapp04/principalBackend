import express from 'express';
import StopService from '../services/StopService';

const router = express.Router()
const stopService = new StopService;

//Upload image for user
router.put('/:idadventure/stop/create', (req, res) => { stopService.createStop(req, res) });
router.put('/:idadventure/stop/update', (req, res) => { stopService.updateStop(req, res) });
router.delete('/:idadventure/stop/:idstop', (req, res) => { stopService.deleteStop(req, res) });
router.post('/:idadventure/stop/:idstop/uploadimages', (req, res) => { stopService.uploadStopImages(req, res) });
router.get('/:idadventure/stop/:idstop', (req, res) => { stopService.getStop(req, res) });

module.exports = router
