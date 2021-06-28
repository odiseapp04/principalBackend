import express from 'express';
import TagService from '../services/TagService';

const router = express.Router()
const tagService = new TagService;

//Routes of Tag
router.put('/create', (req, res) => { tagService.createTag(req, res) });
router.put('/update', (req, res) => { tagService.updateTag(req, res) });
router.delete('/delete/:idcaution', (req, res) => { tagService.deleteTag(req, res) });
router.get('/list', (req, res) => { tagService.listTag(req, res) });
router.post('/listbynames', (req, res) => { tagService.listTagsByNames(req, res) });

module.exports = router