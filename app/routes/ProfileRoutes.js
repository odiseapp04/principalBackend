import express from 'express';
import UserService from '../services/UserService';

const router = express.Router()
const userService = new UserService;

//Upload image for user
router.post('/uploadphoto', (req, res) => { userService.uploadPhoto(req, res) });
router.get('/profile', (req, res) => { userService.getProfile(req, res) });
router.post('/', (req, res) => { userService.getUsers(req, res) }); //Este no va 
router.get('/cards', (req, res) => { userService.getCards(req, res) });
router.get('/bankaccounts', (req, res) => { userService.getBankAccounts(req, res) });
router.get('/adventures', (req, res) => { userService.getAdventures(req, res) });
router.get('/:iduser', (req, res) => { userService.getUserById(req, res) });
router.get('/:iduser/adventures', (req, res) => { userService.getAdventureByUser(req, res) });
router.post('/users', (req, res) => { userService.getUsersBySearch(req, res) });

module.exports = router
