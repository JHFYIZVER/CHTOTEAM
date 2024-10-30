const ApiError = require("../errors/apiError");
const { Game, GameScore, User } = require("../models/models");

class GameRatingController {
  async gameLike(req, res, next) {
    try {
      const { userId, gameId } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const game = await Game.findOne({ where: { id: gameId } });
      if (!game) {
        return next(ApiError.badRequest("Игра не найдена"));
      }
      let gameScore = await GameScore.findOne({
        where: { userId: userId, gameId: gameId },
      });
      if (gameScore) {
        if (gameScore.likes === 1) {
          await GameScore.destroy({
            where: { userId: userId, gameId: gameId },
          });
          return res.json({ message: "Лайк удален" });
        } else if (gameScore.dislikes === 1) {
          await GameScore.update(
            { likes: 1, dislikes: 0 },
            { where: { userId: userId, gameId: gameId } }
          );
          return res.json({ message: "Лайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили эту игру"));
        }
      }
      await GameScore.create({
        userId: userId,
        gameId: gameId,
        likes: 1,
        dislikes: 0,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async gameDislike(req, res, next) {
    try {
      const { userId, gameId } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const game = await Game.findOne({ where: { id: gameId } });
      if (!game) {
        return next(ApiError.badRequest("Игра не найдена"));
      }
      let gameScore = await GameScore.findOne({
        where: { userId: userId, gameId: gameId },
      });
      if (gameScore) {
        if (gameScore.dislikes === 1) {
          await GameScore.destroy({
            where: { userId: userId, gameId: gameId },
          });
          return res.json({ message: "Дизлайк удален" });
        } else if (gameScore.likes === 1) {
          await GameScore.update(
            { likes: 0, dislikes: 1 },
            { where: { userId: userId, gameId: gameId } }
          );
          return res.json({ message: "Дизлайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили эту игру"));
        }
      }
      await GameScore.create({
        userId: userId,
        gameId: gameId,
        likes: 0,
        dislikes: 1,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new GameRatingController();
