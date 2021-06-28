import BaseService from './BaseService';
import StopController from '../controllers/StopController';
const path = require('path');

/**
 * Services for app web
 */
class StopService extends BaseService{

    constructor(){
        super();
        this.pathPhotoStop = "./storage/adventure/";
        this.stopController = new StopController;
    }

    async getStop(req, res){
        try{
            let stop = await this.stopController.getStop(req.params.idstop || 0);
            res.status(200).json(stop);
        }
        catch(err){
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async createStop(req, res){
        try{
            var validator = await this.validatorModels.validateStop(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let newStop = await this.stopController.createStop(
                req.params.idadventure, 
                req.body.nameStop,
                req.body.nameLocationStop,
                req.body.latitude, 
                req.body.longitude,
                req.body.description,
                req.body.cost,
                req.body.wheather,
                req.body.order,
                req.body.isPointStart
            );
            res.status(201).json(
            {
                "ok":JSON.parse(process.env.success).stop_created,
                "stop": newStop
            });
        }
        catch(err){
            this.logger.error("createStop@StopService "+ JSON.stringify(err)+err);
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async updateStop(req, res){
        try{
            var validator = await this.validatorModels.validateStop(req.body);
            var check = await validator.check();
            if(!check)
                res.status(400).json({"error":validator.errors});
            let stop = await this.stopController.updateStop(
                req.body.idstop,
                req.body.nameStop,
                req.body.nameLocationStop,
                req.body.latitude, 
                req.body.longitude,
                req.body.description,
                req.body.cost,
                req.body.wheather,
                req.body.order,
                req.body.isPointStart
            );
            res.status(201).json(
            {
                "ok":JSON.parse(process.env.success).stop_updated,
                "stop": stop
            });
        }
        catch(err){
            this.logger.error("updateStop@StopService "+ JSON.stringify(err)+err);
            res.status(500).json({"error":JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async deleteStop(req, res){
        try{
            await this.stopController.deleteStop(req.params.idstop);
            //Delete folder stopImages
            // await this.deleteFolderStopImages(req.params.idstop)
            res.status(201).json({"ok":JSON.parse(process.env.success).stop_deleted});
        }
        catch(err){
            this.logger.error("deleteStop@StopService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }
    
    async uploadStopImages(req, res){
        try{
            var response = [];
            var images = req.files.images;
            var idadventure = req.params.idadventure;
            var idstop = req.params.idstop;

            //When only is upload a file, images don't array, then we convert images to array        
            if(!Array.isArray(images))
                images = [images];

            for(let image of images){
                try{
                    //Validate if extension photo is allowed
                    await this.validatorFiles.validatePhoto(image);
                    //Name of file photo
                    var nameFile = this.generalHelper.getStringDate()+"_photoStop."+this.fileHelper.getExtensionOfMimeType(image.mimetype);
                    //Create object StopImage on DB
                    await this.stopController.setImage(idstop, nameFile);
                    //Check folder stopsimages
                    var stopImagePath = this.pathPhotoStop+idadventure+'/stop/'+idstop;
                    await this.fileHelper.checkExistsOrCreateDir(stopImagePath)
                    //Move file to storage
                    image.mv(stopImagePath+"/"+nameFile);
                    response.push({
                        "nameFile": image.name,
                        "uploadName": nameFile,
                        "status": true,
                        "info": "Upload Succesfully"
                    })
                }
                catch(err){
                    this.logger.error("uploadStopImages@StopService "+ JSON.stringify(err)+err );
                    response.push({
                        "nameFile": image.name,
                        "status": false,
                        "info": "Upload don't Succesfully"
                    })
                }
            }

            res.status(200).json(
                {
                    "ok":JSON.parse(process.env.success).stop_images_uploaded,
                    "statusImages":response
                }
            );
        }
        catch(err){
            this.logger.error("uploadStopImages@StopService "+ JSON.stringify(err)+err);
            res.status(500).json({err: JSON.parse(process.env.errors).internal_server_error});
        }
    }

    async deleteFolderStopImages(idstop){
        await this.fileHelper.removeFolder(this.pathPhotoStop+req.params.idstop);
    }
}

module.exports = StopService;
