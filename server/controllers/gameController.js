const ApiError = require("../errors/apiError");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");
const { Game, GamePicture, TagGames, TypeGame } = require("../models/models");

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

  async getAll(req, res) {
    const { tags, types, page = 1, limit = 20 } = req.query;
    let games;
    const offset = (page - 1) * limit;

    const whereConditions = {};
    const includeConditions = [];
    if (tags) {
      const tagIds = JSON.parse(tags); 
      includeConditions.push({
        model: TagGames,
        as: "tag_games",
        where: { tagId: tagIds },
        required: true, 
      });
    }

    if (types) {
      const typeIds = JSON.parse(types);
      includeConditions.push({
        model: TypeGame,
        as: "type_games",
        where: { typeId: typeIds },
        required: true, 
      });
    }
    games = await Game.findAll({
      include: includeConditions,
      limit,
      offset,
    });

    return res.json(games);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const game = await Game.findOne({ where: { id } });
    if (!game) {
      return next(ApiError.badRequest("Игра не найдена"));
    }
    return res.json(game);
  }

  async update(req, res) {
    const { id } = req.params;
    const game = await Game.update(req.body, { where: { id } });
    if (!game) {
      return next(ApiError.badRequest("Игра не найдена"));
    }
    return res.json(game);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const game = await Game.destroy({ where: { id } });
      if (!game) {
        return next(ApiError.badRequest("Игра не найдена"));
      }
      return res.json({ message: "Игра удалена", game });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GameController();
