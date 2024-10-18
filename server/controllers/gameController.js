const ApiError = require("../errors/apiError");
const uuid = require("uuid");
const path = require("path");

const {
  Game,
  GameTag,
  GamePicture,
  GameScore,
  Comment,
  ReplyComment,
  Picture,
} = require("../models/models");

class GameController {
  async create(req, res, next) {
    try {
      const {
        statusId,
        tagId,
        userId,
        title,
        shortDescription,
        description,
        videoSource,
        sourse,
      } = req.body;
      const { cover } = req.files;
      const { picture } = req.files;
      let coverName = uuid.v4() + ".jpg";
      let pictureName = uuid.v4() + ".jpg";
      cover.mv(path.resolve(__dirname, "..", "static", "covers", coverName));
      picture.mv(
        path.resolve(__dirname, "..", "static", "pictures", pictureName)
      );

      const game = await Game.create({
        statusId,
        tagId,
        userId,
        pictureGameId: pictureName,
        title,
        shortDescription,
        description,
        coverImage: coverName,
        videoSource,
        sourse,
      });

      return res.json(game);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { tagId, statusId, page, limit } = req.query;
    let games;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;
    if (tagId && statusId) {
      games = await Game.findAll({ where: { tagId, statusId }, limit, offset });
    }
    if ((tagId, !statusId)) {
      games = await Game.findAll({ where: { tagId }, limit, offset });
    }
    if ((!tagId, statusId)) {
      games = await Game.findAll({ where: { statusId }, limit, offset });
    }
    if (!tagId && !statusId) {
      games = await Game.findAll({ limit, offset });
    }
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
    const { id } = req.params;
    const game = await Game.destroy({ where: { id } });
    if (!game) {
      return next(ApiError.badRequest("Игра не найдена"));
    }
    return res.json(game);
  }
}

module.exports = new GameController();
