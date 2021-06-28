import BaseService from './BaseService';
import UserController from '../controllers/UserController';
import CardController from '../controllers/CardController';
import BankAccountController from '../controllers/BankAccountController';
import AdventureController from '../controllers/AdventureController';

const path = require('path');
const sharp = require('sharp');
const RESIZE_IMG_W = 320;
const RESIZE_IMG_H = 240;

/**
 * Services for app web
 */
class UserService extends BaseService{

  
    constructor(){
        super();
        this.sharp = sharp;
        this.pathPhotoProfile = "./public/uploads/imagesprofiles/";
        this.userController = new UserController;
        this.cardController = new CardController;
        this.bankAccountontroller = new BankAccountController;
        this.adventureController = new AdventureController;
    }

    /**
     * Upload photo for user, first validate extension and mimetype of file,
     * change name of file for getStringDate (Check GeneralService),
     * move file to /public/uploads/imagesprofiles,
     * remove file
     */
    async uploadPhoto(req, res){
        try{
            let user = req.payload.data;
            var file = req.files.photo;
            //Validate if extension photo is allowed
            await this.validatorFiles.validatePhoto(file);
            //Name of file photo
            var nameFile = this.generalHelper.getStringDate()+"_photoProfile."+this.fileHelper.getExtensionOfMimeType(file.mimetype);
            //Resize Image User
            var nameFileResize = this.generalHelper.getStringDate()+"_photoProfile_"+RESIZE_IMG_W+"x"+RESIZE_IMG_H+"."+this.fileHelper.getExtensionOfMimeType(file.mimetype);
            this.sharp(file.data)
            .resize(RESIZE_IMG_W, RESIZE_IMG_H)
            .toFile(this.pathPhotoProfile+nameFileResize, (err, info)=>{});
            //Move file to storage
            file.mv(this.pathPhotoProfile+nameFile);
            //Get user (Update last image)
            user = await this.userController.getUser(user.iduser);
            var oldPhotoPath = user.image;
            //Update photo of user
            this.userController.updatePhoto(user.iduser, nameFile);
            //Delete old photo
            if(this.pathPhotoProfile+oldPhotoPath != null){
                var filePath = this.pathPhotoProfile+oldPhotoPath;
                this.fileHelper.removeFile(filePath);
                this.fileHelper.removeFile(filePath.split(".")[1]+"_"+RESIZE_IMG_W+"x"+RESIZE_IMG_H+"."+filePath.split(".")[2]);
            }
                
            return res.status(200).json({"ok":JSON.parse(process.env.success).profile_photo_uploaded, "photo": nameFile, "photoResized": nameFileResize});
        }
        catch(err){
            this.logger.error("uploadPhoto@UserService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getUsers(req, res){
        try{
            let users = await this.userController.getUsers();
            res.status(200).json(users);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getProfile(req, res){
        try{
            let payload = req.payload.data;
            let user = await this.userController.getUserSerialized(payload.iduser);
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getUserById(req, res){
        try{
            let user = await this.userController.getUser(req.params.iduser);
            user = this.userController.serializeUser(user);
            res.status(200).json(user);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getCards(req,res){
        try{
            let payload = req.payload.data;
            let cards = await this.cardController.getCardByUser(payload.iduser);
            res.status(200).json(cards);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getBankAccounts(req,res){
        try{
            let payload = req.payload.data;
            let bankAccounts = await this.bankAccountontroller.getBankAccountByUser(payload.iduser);
            res.status(200).json(bankAccounts);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }


    async getAdventures(req,res){
        try{
            let payload = req.payload.data;
            let adventures = await this.adventureController.getAdventureByUser(payload.iduser, req.query.page || 0);
            res.status(200).json(adventures);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error})
        }
    }

    async getAdventureByUser(req, res){
        try{
            let adventures = await this.adventureController.getAdventureByUser(req.params.iduser, req.query.page || 0);
            res.status(200).json(adventures);
        }
        catch(err){
            this.logger.error("getAdventureByUser@UserService "+ JSON.stringify(err)+err);
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async getUsersBySearch(req, res) {
        try {
            let users = await this.userController.getUserBySearch(req.body.word, req.query.page || 0);
            res.status(200).json(users);
        }
        catch(err) {
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
}

module.exports = UserService;
