const { Validator } = require('node-input-validator');

/**
 * Validation for create User
 * @param {*} user 
 */
async function validateUser(user){
    const validator = new Validator(user, {
        email: 'required|email',
        password: 'required',
        name : 'required',
        lastname: 'required',
        telephone: 'required|digitsBetween:8,12',
        iddocument: 'required|digitsBetween:8,12',
        nickname: 'required',
        gender: 'required|string|maxLength:50'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create Adventure
 * @param {*} adventure 
 */
async function validateAdventure(adventure){
    const validator = new Validator(adventure, {
        idadventure: 'numeric|sometimes',
        iduser: 'numeric|sometimes',
        nameAdventure: 'required|string|maxLength:200',
        transports: 'string|nullable',
        generalInfo: 'string|nullable',
        citySource: 'string|maxLength:100|maxLength:100|nullable',
        countrySource: 'string|maxLength:100|nullable',
        cityDestination: 'string|maxLength:100|nullable',
        countryDestination: 'string|maxLength:100|nullable',
        adventureSource: 'string|maxLength:100|nullable',
        adventureDestination: 'string|maxLength:100|nullable',
        distance: 'numeric|maxLength:10|nullable',
        totalCost: 'numeric|maxLength:15|nullable',
        price: 'numeric|maxLength:15|nullable',
        bestPhoto: 'string|nullable',
        typeTravel: 'string|maxLength:200',
        durationDays: 'numeric|maxLength:4|nullable',
        isVisible: 'boolean',
        baggage: 'string|nullable',
        weather: 'string|maxLength:50|nullable'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}
/**
 * Validation for create Card
 * @param {*} card 
 */
async function validateCard(card){
    const validator = new Validator(card, {
        idcard:'numeric|sometimes',
        iduser:'required|sometimes',
        numberCard:'string|required',
        verificationCode:'string|maxLength:4|required',
        nameUserCard:'required',
        expiredDate:'required',
        typeCard:'required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create Stop
 * @param {*} stop 
 */
async function validateStop(stop){
    const validator = new Validator(stop, {
        idstop: 'numeric|sometimes',
        nameStop: 'string|maxLength:200', 
        latitude: 'string|maxLength:20|nullable',
        longitude: 'string|maxLength:20|nullable',
        description: 'string|nullable',
        cost: 'maxLength:15|nullable',
        wheather: 'string|maxLength:50|nullable',
        order: 'numeric|maxLength:5|nullable',
        isPointStart: 'boolean|nullable'

        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create BankAccount
 * @param {*} bankAccount 
 */
async function validateBankAccount(bankAccount){
    const validator = new Validator(bankAccount, {
        idbankaccount: 'numeric|sometimes',
        iduser: 'required|numeric',
        numberAccount: 'string|maxLength:300|required',
        nameUser: 'string|maxLength:300|required',
        nameBank: 'string|maxLength:300|required',
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create Recommendation
 * @param {*} recommendation 
 */
async function validateRecommendation(recommendation){
    const validator = new Validator(recommendation, {
        idrecommendation: 'numeric|sometimes',
        recommendation: 'string|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create StopPhone
 * @param {*} stopPhone 
 */
async function validateStopPhone(stopPhone){
    const validator = new Validator(stopPhone, {
        idstopphone: 'numeric|sometimes',
        telephone: 'string|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create Caution
 * @param {*} recommendation 
 */
async function validateCaution(caution){
    const validator = new Validator(caution, {
        idcaution: 'numeric|sometimes',
        description: 'string|required',
        level: 'string|maxLength:255|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create typeTransport
 * @param {*} typeTransport 
 */
async function validateTypeTransport(typeTransport){
    const validator = new Validator(typeTransport, {
        idtypetransport: 'numeric|sometimes',
        typeTransport: 'string|maxLength:255|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create tag
 * @param {*} tag 
 */
async function validateTag(tag){
    const validator = new Validator(tag, {
        idtag: 'numeric|sometimes',
        name: 'string|maxLength:255|required',
        description: 'string|maxLength:255|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create buyadventure
 * @param {*} buyAdventure 
 */
async function validateBuyAdventure(buyAdventure){
    const validator = new Validator(buyAdventure, {
        iduser: 'numeric|required',
        idadventure: 'numeric|required',
        waytopay: 'string|maxLength:255|required',
        state: 'string|maxLength:100|required',
        codeFacturation: 'string|maxLength:255|required',
        },JSON.parse(process.env.validators)
    );
    return await validator;
}

/**
 * Validation for create AdventureQualify
 * @param {*} buyAdventure 
 */
async function validateBuyAdventureQualify(adventureQualify){
    const validator = new Validator(adventureQualify, {
        iduser: 'numeric|required',
        idadventure: 'numeric|required',
        qualify: 'string|maxLength:255|required',
        comment: 'string|maxLength:100|required'
        },JSON.parse(process.env.validators)
    );
    return await validator;
}


module.exports.validateUser = validateUser;
module.exports.validateAdventure = validateAdventure;
module.exports.validateStop = validateStop;
module.exports.validateBankAccount = validateBankAccount;
module.exports.validateCard = validateCard;
module.exports.validateRecommendation = validateRecommendation;
module.exports.validateCaution = validateCaution;
module.exports.validateStopPhone = validateStopPhone;
module.exports.validateTypeTransport = validateTypeTransport;
module.exports.validateTag = validateTag;
module.exports.validateBuyAdventure = validateBuyAdventure;