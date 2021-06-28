import BaseController from './BaseController';
import BankAccount from '../models/BankAccount';

/**
 * BankAccountController
 */
class BankAccountController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Get BankAccount by id 
     * @param {*} idbankaccount 
     */
    async getBankAccount(idbankaccount){
        try{
            let bankAccount = await BankAccount.findByPk(idbankaccount);
            return bankAccount;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Return List BankAccounts
     */
    async getBankAccounts(page){
        try{
            let bankAccounts = await BankAccount.findAll({ offset: (10*page), limit: 10 });
            return bankAccounts;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create BankAccount with required params
     */
    async createBankAccount(piduser, pnumberAccount, pnameUser, pnameBank)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let bankAccountNew = await BankAccount.create({
                iduser: piduser,
                numberAccount: pnumberAccount,
                nameUser: pnameUser,
                nameBank: pnameBank,
            }, {transaction: transaction})

            await transaction.commit();
            return bankAccountNew;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Delete BankAccount by id
     * @param {*} pidbankaccount 
     */
    async deleteBankAccount(pidbankaccount){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await BankAccount.destroy({ where: { idbankaccount: pidbankaccount } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Update BankAccount by id with required params
     */
    async updateBankAccount(pidbankaccount, piduser, pnumberAccount, pnameUser, pnameBank)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let bankAccount = await BankAccount.update({
                iduser: piduser,
                numberAccount: pnumberAccount,
                nameUser: pnameUser,
                nameBank: pnameBank,
            },{where : {idbankaccount:pidbankaccount}}, {transaction: transaction})

            await transaction.commit();
            return bankAccount;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    async getBankAccountByUser(piduser){
        try{
            let bankAccounts = await BankAccount.findAll({where:{iduser: piduser}})
            return bankAccounts;
        }
        catch(err){
            throw err;
        }
    }
}

//Exports-------------------------------------
module.exports = BankAccountController;