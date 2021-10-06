import User from './User';
import Adventure from './Adventure';
import Stop from './Stop';
import BankAccount from './BankAccount';
import Card from './Card';
import StopImage from './StopImage';
import Recommendation from './Recommendation';
import Caution from './Caution';
import TypeTransport from './TypeTransport';
import Tag from './Tag';
import StopPhone from './StopPhone';
import BuyAdventure from './BuyAdventure';


/**
 * Relation User has many Adventures
 */
User.hasMany(Adventure,{as:"adventures", foreignKey: 'iduser', sourceKey: 'iduser'});
Adventure.belongsTo(User,{as:"user", foreignKey: 'iduser'});

/**
 * Relation Adventure has many Stops
 */
Adventure.hasMany(Stop,{as:"stops", foreignKey: 'idadventure', sourceKey: 'idadventure'});
Stop.belongsTo(Adventure,{as:"adventure", foreignKey: 'idadventure'});

/**
 * Relation User has one BankAccount
 */
User.hasOne(BankAccount,{as:"bankaccount", foreignKey: 'iduser', sourceKey: 'iduser'});
BankAccount.belongsTo(User,{as:"user", foreignKey: 'iduser'});

/**
 * Relation User has many Cards
 */
User.hasMany(Card,{as:"cards", foreignKey: 'iduser', sourceKey: 'iduser'});
Card.belongsTo(User,{as:"user", foreignKey: 'iduser'});

/**
 * Relation Stop has many StopImage
 */
Stop.hasMany(StopImage,{as:"images", foreignKey: 'idstop', sourceKey: 'idstop'});
StopImage.belongsTo(Stop,{as:"stop", foreignKey: 'idstop'});

/**
 * Relation Stop has many Recommendation
 */
Stop.hasMany(Recommendation,{as:"recommendations", foreignKey: 'idstop', sourceKey: 'idstop'});
Recommendation.belongsTo(Stop,{as:"stop", foreignKey: 'idstop'});

/**
 * Relation Stop has many StopPhones
 */
Stop.hasMany(StopPhone,{as:"stopPhones", foreignKey: 'idstop', sourceKey: 'idstop'});
StopPhone.belongsTo(Stop,{as:"stop", foreignKey: 'idstop'});

/**
 * Relation Stop has many Cautions
 */
Stop.hasMany(Caution,{as:"cautions", foreignKey: 'idstop', sourceKey: 'idstop'});
Caution.belongsTo(Stop,{as:"stop", foreignKey: 'idstop'});

/**
 * Relation one to one between stops
 */
Stop.hasOne(TypeTransport, { as: 'typeTransport', foreignKey: 'idstop', sourceKey: 'idstop' });
TypeTransport.belongsTo(Stop,{as:"stop", foreignKey: 'idstop'});

/**
 * Relation Adventure has many tag, and Tag has many Adventure
 */
Adventure.belongsToMany(Tag, { as:'tags', through: 'AdventureTags', foreignKey:'idadventure', sourceKey:'idadventure' });
Tag.belongsToMany(Adventure, { as:'adventures', through: 'AdventureTags', foreignKey:'idtag', sourceKey:'idtag' });

/**
 * BuyAdventures - Adventure
 */
Adventure.hasMany(BuyAdventure, {as:"BuyAdventures", foreignKey: 'idadventure', sourceKey: 'idadventure'});
BuyAdventure.belongsTo(Adventure, {as:"boughtAdventure", foreignKey: 'idadventure'});

/**
 * BuyAdventures - user
 */
User.hasMany(BuyAdventure, {as:"BuyAdventures", foreignKey: 'iduser', sourceKey: 'iduser'});
BuyAdventure.belongsTo(User, {as:"userBuyer", foreignKey: 'iduser'});

/**
 * User Qualify Adventures
 */
Adventure.belongsToMany(User, { as:'qualifiers', through: 'AdventuresQualifies', foreignKey:'idadventure', sourceKey:'idadventure' });
User.belongsToMany(Adventure, { as:'qualifications', through: 'AdventuresQualifies', foreignKey:'iduser', sourceKey:'iduser' });