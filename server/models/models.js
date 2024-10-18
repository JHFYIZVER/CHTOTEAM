const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  dataBirth: { type: DataTypes.DATE },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  verify: { type: DataTypes.BOOLEAN, defaultValue: false },
}); // Пользователи

const Profile = sequelize.define("profile", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  UserPictureId: { type: DataTypes.STRING },
}); // Профиль пользователя

const Status = sequelize.define("status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
}); // Статусы

const StatusGame = sequelize.define("statusGame", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  statusId: { type: DataTypes.INTEGER },
}); // Статус игры вышла, в процессе или нет

const Game = sequelize.define("game", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  statusId: { type: DataTypes.INTEGER },
  tagId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
  pictureGameId: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING },
  shortDiscription: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  coverImage: { type: DataTypes.STRING },
  videoSource: { type: DataTypes.STRING },
  sourse: { type: DataTypes.STRING },
}); // Игры

const Tag = sequelize.define("tag", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
}); // Теги

const GameTag = sequelize.define("gameTag", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  tagId: { type: DataTypes.INTEGER },
}); // Теги игр

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
  dataComment: { type: DataTypes.DATE },
  text: { type: DataTypes.STRING },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Комментарии

const ReplyComment = sequelize.define("replyComment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  commentId: { type: DataTypes.INTEGER },
  dataComment: { type: DataTypes.DATE },
  text: { type: DataTypes.STRING },
}); // Ответы к комментария

const Picture = sequelize.define("picture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: DataTypes.STRING },
}); // Картинки

const GamePicture = sequelize.define("gamePicture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  pictureId: { type: DataTypes.INTEGER },
}); // Игровые картинки

const UserPicture = sequelize.define("userPicture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  profileId: { type: DataTypes.INTEGER },
  pictureId: { type: DataTypes.INTEGER },
}); // Пользовательские картинки

const GameScore = sequelize.define("gameScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Игровые рейтинги

const UserScore = sequelize.define("userScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Пользовательские рейтинги

const Friends = sequelize.define("friends", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  friendId: { type: DataTypes.INTEGER },
}); // Друзья

const UserGame = sequelize.define("userGame", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  gameId: { type: DataTypes.INTEGER },
  conditionId: { type: DataTypes.INTEGER },
}); // Игры пользователя в которые он (Играет, будет играть, не играет)

const Condition = sequelize.define("condition", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
}); // играю буду игарть

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
}); // Типы игр (Популярные, Новинки, Рекомендуемые и т.д.)

const ConditionGame = sequelize.define("conditionGame", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  typeId: { type: DataTypes.INTEGER },
}); // Список играю, буду играть, не играю

const TypeGames = sequelize.define("typeGames", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  typeId: { type: DataTypes.INTEGER },
}); // Типы игр (Популярные, Новинки, Рекомендуемые и т.д.)

const verifyUser = sequelize.define("verifyUser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.BOOLEAN },
}); // Подтверждение пользователя

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User);

User.hasMany(UserGame, { foreignKey: "userId" });
UserGame.belongsTo(User);

User.hasMany(Friends, { foreignKey: "userId" });
Friends.belongsTo(User);

User.hasMany(UserScore, { foreignKey: "userId" });
UserScore.belongsTo(User);

User.hasOne(verifyUser, { foreignKey: "userId" });
verifyUser.belongsTo(User);

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User);

User.hasMany(ReplyComment, { foreignKey: "userId" });
ReplyComment.belongsTo(User);

Condition.hasMany(ConditionGame, { foreignKey: "conditionId" });
ConditionGame.belongsTo(Condition);

UserGame.hasOne(ConditionGame, { foreignKey: "conditionId" });
ConditionGame.belongsTo(UserGame);

Profile.hasOne(UserPicture, { foreignKey: "profileId" });
UserPicture.belongsTo(Profile);

Picture.hasOne(GamePicture, { foreignKey: "pictureId" });
GamePicture.belongsTo(Picture);

Picture.hasOne(UserPicture, { foreignKey: "pictureId" });
UserPicture.belongsTo(Picture);

Tag.hasMany(GameTag, { foreignKey: "tagId" });
GameTag.belongsTo(Tag);

Game.hasMany(GamePicture, { foreignKey: "gameId" });
GamePicture.belongsTo(Game);

Game.hasMany(UserGame, { foreignKey: "gameId" });
UserGame.belongsTo(Game);

Game.hasMany(GameTag, { foreignKey: "gameId" });
GameTag.belongsTo(Game);

Game.hasOne(GameScore, { foreignKey: "gameId" });
GameScore.belongsTo(Game);

Game.hasMany(Comment, { foreignKey: "gameId" });
Comment.belongsTo(Game);

Game.hasMany(TypeGames, { foreignKey: "gameId" });
TypeGames.belongsTo(Game);

Type.hasMany(TypeGames, { foreignKey: "typeId" });
TypeGames.belongsTo(Type);

Status.hasMany(StatusGame, { foreignKey: "statusId" });
StatusGame.belongsTo(Status);

Game.hasOne(StatusGame, { foreignKey: "gameId" });
StatusGame.belongsTo(Game);

Game.hasOne(ConditionGame, { foreignKey: "gameId" });
ConditionGame.belongsTo(Game);

Comment.hasMany(ReplyComment, { foreignKey: "commentId" });
ReplyComment.belongsTo(Comment);

module.exports = {
  User,
  Profile,
  Status,
  StatusGame,
  Game,
  Tag,
  GameTag,
  Comment,
  ReplyComment,
  Picture,
  GamePicture,
  UserPicture,
  GameScore,
  UserScore,
  Friends,
  UserGame,
  ConditionGame,
  Type,
  Condition,
  TypeGames,
  verifyUser,
};
