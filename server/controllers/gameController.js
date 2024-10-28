const ApiError = require("../errors/apiError");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");
const {
  Game,
  GamePicture,
  TagGames,
  TypeGame,
  GameScore,
  UserGame,
} = require("../models/models");

const includeArr = [
  { model: GamePicture, as: "photos" },
  { model: TagGames, as: "tag_games" },
  { model: TypeGame, as: "type_games" },
];

class GameController {
  async create(req, res, next) {
    try {
      let {
        statusId,
        tagIds,
        typeIds,
        userId,
        title,
        shortDiscription,
        description,
        videoSource,
        sourse,
        conditionId,
      } = req.body;
      const prevGame = await Game.findOne({
        where: { title },
        include: includeArr,
      });
      if (prevGame) {
        return next(ApiError.badRequest("Игра уже существует"));
      }

      const { cover } = req.files;
      let coverName = uuid.v4() + ".png";
      cover.mv(path.resolve(__dirname, "..", "static", "covers", coverName));
      const images = req.files;
      const imageNames = [];
      if (!images) {
        return next(ApiError.badRequest("No images"));
      }

      const game = await Game.create({
        statusId,
        userId,
        title,
        shortDiscription,
        description,
        videoSource,
        sourse,
        coverImage: coverName,
        conditionId,
      });

      await GameScore.create({ gameId: game.id });

      if (images.img.length > 1) {
        images.img.forEach((image) => {
          const fileName = uuid.v4() + ".jpg";
          image.mv(path.resolve(__dirname, "..", "static", fileName));
          imageNames.push(fileName);
        });
      } else {
        const fileName = uuid.v4() + ".jpg";
        images.img.mv(path.resolve(__dirname, "..", "static", fileName));
        imageNames.push(fileName);
      }
      imageNames.forEach((imageName) => {
        GamePicture.create({ url: imageName, gameId: game.id });
      });

      if (tagIds) {
        tagIds = JSON.parse(tagIds);
        tagIds.forEach((tagId) => {
          TagGames.create({ tagId, gameId: game.id });
        });
      }
      if (typeIds) {
        typeIds = JSON.parse(typeIds);
        typeIds.forEach((typeId) => {
          TypeGame.create({ typeId, gameId: game.id });
        });
      }

      return res.json(game);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const game = await Game.findOne({
      where: { id },
      include: [
        { model: GamePicture, as: "photos" },
        { model: TagGames, as: "tag_games" },
        { model: TypeGame, as: "type_games" },
      ],
    });
    if (!game) {
      return next(ApiError.badRequest("Игра не найдена"));
    }
    return res.json(game);
  }

  async update(req, res) {
    
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.findOne({
        where: { id },
        include: [{ model: GamePicture, as: "photos" }],
      });
      if (!game) {
        return next(ApiError.badRequest("Игра не найдена"));
      }
      if (game.photos.length > 0) {
        game.photos.forEach((photo) => {
          const filePath = path.resolve(__dirname, "..", "static", photo.url);
          fs.unlinkSync(filePath);
        });
      }
      await Game.destroy({ where: { id } });
      return res.json({ message: "Игра удалена", game });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async checUserGame(req, res) {
    const { userId, gameId } = req.body;
    const userGame = await UserGame.findOne({ where: { userId, gameId } });
    return res.json(userGame.conditionId);
  }

  async changeCondition(req, res, next) {
    try {
      const { userId, conditionId, gameId } = req.body;
      const userGame = await UserGame.update(
        { conditionId },
        { where: { userId, gameId } }
      );
      if (!userGame) {
        return next(ApiError.badRequest("Игра не найдена"));
      }
      return res.json(userGame);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllStatistics(req, res, next) {
    try {
      const { gameId } = req.body;
      const userCoditions = await UserGame.findAll({
        where: { gameId },
        attributes: ["conditionId"],
      });
      const data = userCoditions.reduce(
        (acc, userCondition) => {
          if (userCondition.conditionId === 1) {
            return { ...acc, play: acc.play + 1 };
          } else if (userCondition.conditionId === 2) {
            return { ...acc, gonnaPlay: acc.gonnaPlay + 1 };
          } else if (userCondition.conditionId === 3) {
            return { ...acc, abandoned: acc.abandoned + 1 };
          }
        },
        { play: 0, gonnaPlay: 0, abandoned: 0 }
      );
      return res.json({ data });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GameController();
