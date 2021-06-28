import express from 'express';
import StopPhoneService from '../services/StopPhoneService';

const router = express.Router()
const stopPhoneService = new StopPhoneService;

//Routes of stopphones
router.put('/:idadventure/stop/:idstop/stopphone/create', (req, res) => { stopPhoneService.createStopPhone(req, res) });
router.put('/:idadventure/stop/:idstop/stopphone/update', (req, res) => { stopPhoneService.updateStopPhone(req, res) });
router.delete('/:idadventure/stop/:idstop/stopphone/:idstopphone', (req, res) => { stopPhoneService.deleteStopPhone(req, res) });

module.exports = router