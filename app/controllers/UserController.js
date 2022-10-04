import BaseController from './BaseController';
import User from '../models/User';
import Sequelize from 'sequelize';

/**
 * UserController
 */
class UserController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List Users
     */
    async getUsers(){
        try{
            let users = await User.findAll();
            return users;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create User with required params
     */
    async createUser(pname, plastname, ppassword, piddocument, pemail, ptelephone, pnickname, pgender ){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            await User.create({
                name:pname,
                lastname:plastname,
                password:this.bcrypt.hashSync(ppassword,10),
                iddocument:piddocument,
                email:pemail,
                telephone:parseInt(ptelephone),
                nickname: pnickname,
                gender: pgender
            }, {transaction: transaction})

            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Delete user by id
     * @param {*} iduser 
     */
    async deleteUser(iduser){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await User.destroy({ where: { iduser: iduser } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Get user by id 
     * @param {*} iduser 
     */
    async getUser(iduser){
        try{
            let userRes = await User.findByPk(iduser);
            return userRes;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Update token for iduser on DB
     * @param {*} piduser 
     * @param {*} ptoken 
     */
    async updateToken(piduser, ptoken){
        try{
            await User.update({ token: ptoken }, { where : { iduser:piduser }});
            // this.dbAuthRedisClient.set(piduser, ptoken);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Get token by id 
     * @param {*} iduser
     * callback********
     */
    async getToken(iduser){
        try{
            let userToken = await User.findByPk(iduser).token;
            return userToken;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Get user by id 
     * @param {*} iduser 
     */
    async getUserSerialized(iduser){
        try{
            let userRes = await User.findByPk(iduser,{include: ["bankaccount", "cards"]});
            return this.serializeUser(userRes);
        }
        catch(err){
            throw err;
        }
    }

    async getUserBySearch( param, page ) {
        try {
            let users = await User.findAll({
                where: {
                    nickname: {
                        [Sequelize.Op.like]: `%${param}%`
                    }     
                },
                offset: (10*page),
                limit: 10
            })

            return users;
        }
        catch(err) {
            throw err;
        }
    }

    /**
     * Get user by email (Unique)
     * @param {*} pEmail 
     */
    async getUserByEmail(pEmail){
        try{
            let userRes = await User.findOne({where:{email: pEmail}});
            return userRes;
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Returns User Serialized (without fields token, password, etc..) by email
     * @param {} pEmail 
     */
    async getUserByEmailSerialized(pEmail){
        try{
            let userRes = await User.findOne({where:{email: pEmail}});
            return this.serializeUser(userRes);
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Update image for iduser on DB
     * @param {*} piduser 
     * @param {*} pImage 
     */
    async updatePhoto(piduser, pImage){
        try{
            await User.update({image: pImage}, {where : {iduser:piduser}});
        }
        catch(err){
            throw err;
        }
    }

    /**
     * Returns JSON `user` without some fields
     * @param {*} user 
     */
    serializeUser(user){
        delete user['dataValues']['token'];
        delete user['dataValues']['password'];
        delete user['dataValues']['createdAt'];
        delete user['dataValues']['updatedAt'];
        delete user['_previousDataValues']['token'];
        delete user['_previousDataValues']['password'];
        delete user['_previousDataValues']['createdAt'];
        delete user['_previousDataValues']['updatedAt'];

        return user;
    }
}

//Exports-------------------------------------
module.exports = UserController;