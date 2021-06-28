import mime from 'mime-types';
import fs from 'fs';
import fsext from 'fs-extra';

/**
 * Returns extension of mimetype
 * @param {*} mimeType 
 */
function getExtensionOfMimeType(mimeType){
    return mime.extension(mimeType);
}

/**
 * Check if exist folder, otherwise create folder
 * @param {*} path 
 */
async function checkExistsOrCreateDir(path){
    if (!fs.existsSync(path)){
        fs.mkdirSync(path, { recursive: true });
    }

}

/**
 * Remove file with path
 * @param {*} path 
 */
function removeFile(path){
    try{
        fs.unlinkSync(path);
    }
    catch(err){
        console.log(err);
    }
}


/**
 * Remove folder with path
 * @param {*} path 
 */
async function removeFolder(path){
    try{
        await fsext.remove(path);
    }
    catch(err){
        console.log(err);
    }
}


module.exports.getExtensionOfMimeType = getExtensionOfMimeType;
module.exports.checkExistsOrCreateDir = checkExistsOrCreateDir;
module.exports.removeFile = removeFile;
module.exports.removeFolder = removeFolder;