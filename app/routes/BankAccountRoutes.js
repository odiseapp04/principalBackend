import express from 'express';
import BankAccountService from '../services/BankAccountService';

const router = express.Router()
const bankAccountService = new BankAccountService;

//Upload image for user
router.put('/create', (req, res) => { bankAccountService.createBankAccount(req, res) });
router.put('/update', (req, res) => { bankAccountService.updateBankAccount(req, res) });
router.delete('/delete/:idbankaccount', (req, res) => { bankAccountService.deleteBankAccount(req, res) });

module.exports = router
