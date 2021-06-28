import BaseService from './BaseService';
import BankAccountController from '../controllers/BankAccountController';
const path = require('path');

/**
 * Services for app web
 */
class BankAccountService extends BaseService{

    constructor(){
        super();
        this.bankAccountController = new BankAccountController;
    }

    async createBankAccount(req, res){
        try{
            var validator = await this.validatorModels.validateBankAccount(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let bak = await this.bankAccountController.createBankAccount(
                req.body.iduser, 
                req.body.numberAccount, 
                req.body.nameUser, 
                req.body.nameBank
            );
            res.status(201).json(
            {
                "ok":JSON.parse(process.env.success).bankaccount_created,
                "bankAccount": bak
            });
        }
        catch(err){
            this.logger.error("createBankAccount@BankAccountService "+ JSON.stringify(err));
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async updateBankAccount(req, res){
        try{
            var validator = await this.validatorModels.validateBankAccount(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let bak = await this.bankAccountController.updateBankAccount  (
                req.body.idbankaccount,
                req.body.iduser, 
                req.body.numberAccount, 
                req.body.nameUser, 
                req.body.nameBank
            );
            res.status(201).json(
            {
                "ok":JSON.parse(process.env.success).bankaccount_updated,
                "bankAccount":bak
            });
        }
        catch(err){
            this.logger.error("updateBankAccount@BankAccountService "+ JSON.stringify(err));
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async deleteBankAccount(req, res){
        try{
            await this.bankAccountController.deleteBankAccount(req.params.idbankaccount);
            res.status(201).json({"ok":JSON.parse(process.env.success).bankaccount_deleted});
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
    
}

module.exports = BankAccountService;
