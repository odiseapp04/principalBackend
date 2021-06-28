import Logger from '../imports/Logger';
import ValidatorModels from '../helpers/ValidatorModels';
import ValidatorFiles from '../helpers/ValidatorFiles';
import FileHelper from '../helpers/FileHelper';
import GeneralHelper from '../helpers/GeneralHelper';
import DBAuth from '../imports/DBAuth';

/**
 * Services for app web
 */

class BaseService{

    constructor(){
        this.validatorModels = ValidatorModels;
        this.validatorFiles = ValidatorFiles;
        this.logger = Logger.getLogger();
        this.fileHelper = FileHelper;
        this.generalHelper = GeneralHelper;
        this.dbAuthRedisClient = DBAuth;
    }
}

module.exports = BaseService;
