import express from 'express';
import TypeTransportService from '../services/TypeTransportService';

const router = express.Router()
const typeTransportService = new TypeTransportService;

//Routes of Typetransport
router.put('/:idadventure/stop/:idstop/typetransport/create', 
    (req, res) => { typeTransportService.createTypeTransport(req, res) });

router.put('/:idadventure/stop/:idstop/typetransport/update', 
    (req, res) => { typeTransportService.updateTypeTransport(req, res) });

router.delete('/:idadventure/stop/:idstop/typetransport/:idtypetransport', 
    (req, res) => { typeTransportService.deleteTypeTransport(req, res) });

module.exports = router