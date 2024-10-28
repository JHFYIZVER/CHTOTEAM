const { UserGame, User, Condition } = require("../models/models");
const ApiError = require("../errors/apiError");

class UserGameController {
  async create(req, res, next) {
    try {
      const { userId, conditionId, gameId } = req.body;
      const userGame = await UserGame.create({
        userId,
        conditionId,
        gameId,
      });
      return res.json({
        userGame,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const userGame = await UserGame.destroy({
        where: { id },
      });
      return res.json({
        userGame,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { userId } = req.params;
      const userGames = await UserGame.findAll({
        where: {
          userId,
        },
      });
      const playGames = userGames.filter(
        (userGame) => userGame.conditionId === 1
      );
      const gonnaPlayGames = userGames.filter(
        (userGame) => userGame.conditionId === 2
      );
      const abandonedGames = userGames.filter(
        (userGame) => userGame.conditionId === 3
      );
      return res.json({ playGames, gonnaPlayGames, abandonedGames });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  
}

module.exports = new UserGameController();
