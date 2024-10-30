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

const Game = sequelize.define("game", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  statusId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
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

const TagGames = sequelize.define("tag_games", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  tagId: { type: DataTypes.INTEGER },
}); // Теги игр

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
  text: { type: DataTypes.STRING },
  commentScoreId: { type: DataTypes.INTEGER },
}); // Комментарии

const ReplyComment = sequelize.define("replyComment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  commentId: { type: DataTypes.INTEGER },
  text: { type: DataTypes.STRING },
  parentReplyId: { type: DataTypes.INTEGER, allowNull: true },
  commentScoreId: { type: DataTypes.INTEGER },
}); // Ответы к комментария

const CommentScore = sequelize.define("commentScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  commentId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const ReplyCommentScore = sequelize.define("replyCommentScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  replyId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const GamePicture = sequelize.define("gamePicture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
}); // Игровые картинки

const UserPicture = sequelize.define("userPicture", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  profileId: { type: DataTypes.INTEGER },
  url: { type: DataTypes.STRING, allowNull: false },
}); // Пользовательские картинки

const GameScore = sequelize.define("gameScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  userId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Игровые рейтинги

const UserScore = sequelize.define("userScore", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  targetUserId: { type: DataTypes.INTEGER },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
}); // Пользовательские рейтинги

const Friends = sequelize.define("friends", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: {
    type: DataTypes.ENUM("pending", "accepted"),
    defaultValue: "pending",
  },
  userId: { type: DataTypes.INTEGER }, // id текущего пользователя
  friendId: { type: DataTypes.INTEGER }, // id другого пользователя
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

const TypeGame = sequelize.define("type_game", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gameId: { type: DataTypes.INTEGER },
  typeId: { type: DataTypes.INTEGER },
}); // Типы игр в игре

const VerifyUser = sequelize.define("verifyUser", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER },
  status: { type: DataTypes.BOOLEAN },
}); // Подтверждение пользователя

const TagType = sequelize.define("tag_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User);

User.hasMany(UserGame, { foreignKey: "userId" });
UserGame.belongsTo(User);

User.hasMany(Friends, { foreignKey: "userId", as: "friend" });
Friends.belongsTo(User);

User.hasMany(UserScore, { foreignKey: "userId" });
UserScore.belongsTo(User);

User.hasOne(VerifyUser, { foreignKey: "userId" });
VerifyUser.belongsTo(User);

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User);

User.hasMany(ReplyComment, { foreignKey: "userId" });
ReplyComment.belongsTo(User);

UserGame.hasOne(Condition, { foreignKey: "conditionId" });
Condition.belongsTo(UserGame);

Profile.hasOne(UserPicture, { foreignKey: "profileId", as: "photo" });
UserPicture.belongsTo(Profile);

Game.hasMany(GamePicture, { foreignKey: "gameId", as: "photos" });
GamePicture.belongsTo(Game);

Game.hasMany(UserGame, { foreignKey: "gameId" });
UserGame.belongsTo(Game);

Game.hasMany(TagGames, { foreignKey: "gameId" });
TagGames.belongsTo(Game);

Tag.hasMany(TagGames, { foreignKey: "tagId" });
TagGames.belongsTo(Tag);

Game.hasOne(GameScore, { foreignKey: "gameId" });
GameScore.belongsTo(Game);

Game.hasMany(Comment, { foreignKey: "gameId" });
Comment.belongsTo(Game);

Game.hasMany(TypeGame, { foreignKey: "gameId" });
TypeGame.belongsTo(Game);

Type.hasMany(TypeGame, { foreignKey: "typeId" });
TypeGame.belongsTo(Type);

Game.hasOne(Status, { foreignKey: "gameId" });
Status.belongsTo(Game);

Game.hasOne(Condition, { foreignKey: "gameId" });
Condition.belongsTo(Game);

Condition.hasMany(Game, { foreignKey: "conditionId" });
Game.belongsTo(Condition);

Comment.hasMany(ReplyComment, { foreignKey: "commentId", as: "replies" });
ReplyComment.belongsTo(Comment);

Comment.hasMany(CommentScore, { foreignKey: "commentId" });
CommentScore.belongsTo(Comment);

ReplyComment.hasMany(ReplyComment, {
  foreignKey: "parentReplyId",
});

ReplyComment.belongsTo(ReplyComment, {
  foreignKey: "parentReplyId",
  as: "parentReply",
});

ReplyComment.hasMany(ReplyCommentScore, { foreignKey: "replyId" });
ReplyCommentScore.belongsTo(ReplyComment);

TagGames.belongsToMany(TypeGame, { through: TagType });
TypeGame.belongsToMany(TagGames, { through: TagType });

module.exports = {
  User,
  Profile,
  Status,
  Game,
  Tag,
  TagGames,
  Comment,
  ReplyComment,
  CommentScore,
  ReplyCommentScore,
  GamePicture,
  UserPicture,
  GameScore,
  UserScore,
  Friends,
  UserGame,
  Type,
  TypeGame,
  Condition,
  VerifyUser,
  TagType,
};
