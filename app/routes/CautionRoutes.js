import express from 'express';
import CautionService from '../services/CautionService';

const router = express.Router()
const cautionService = new CautionService;

//Routes of Cautions
router.put('/:idadventure/stop/:idstop/caution/create', (req, res) => { cautionService.createCaution(req, res) });
router.put('/:idadventure/stop/:idstop/caution/update', (req, res) => { cautionService.updateCaution(req, res) });
router.delete('/:idadventure/stop/:idstop/caution/:idcaution', (req, res) => { cautionService.deleteCaution(req, res) });

module.exports = router