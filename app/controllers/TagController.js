import BaseController from './BaseController';
import Tag from '../models/Tag';
import Sequelize from 'sequelize';

/**
 * TagController
 */
class TagController extends BaseController{
    
    constructor(){
        super();
    }

    /**
     * Return List Tags
     */
    async getTags(page){
        try{
            let tags = await Tag.findAll({ offset: (10*page), limit: 10});
            return tags;
        }
        catch(err){
            throw err;
        }
    }

     /**
     * Return List Tags by Names
     */
    async getTagsByNames(names){
        try{
            let tags = await Tag.findAll({
                where: {
                    name:{
                        [Sequelize.Op.or]: names
                    }     
                }
            });
            return tags;
        }
        catch(err){
            throw err;
        }
    }
    
    /**
     * Create Tag
     */
    async createTag(pname, pdescription)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let tag = await Tag.create({
                name: pname,
                description: pdescription
            }, {transaction: transaction})

            await transaction.commit();
            return tag;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }
    
    /**
     * Delete tag by id
     * @param {*} pidtag 
     */
    async deleteTag(pidtag){
        let transaction;
        try{
            transaction = await this.sequelize.transaction();
            await Tag.destroy({ where: { idtag: pidtag } }, {transaction: transaction});
            await transaction.commit();
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

    /**
     * Update Tag by id
     */
    async updateTag(pidtag, pname, pdescription)
    {
        let transaction;
        try{
            transaction = await this.sequelize.transaction();

            let tag = await Tag.update({
               name: pname,
               description: pdescription
            },{where : {idtag:pidtag}}, {transaction: transaction})

            await transaction.commit();
            return tag;
        }
        catch(err){
            await transaction.rollback();
            throw err;
        }
    }

}

//Exports-------------------------------------
module.exports = TagController;