const { User, UserScore } = require("../models/models");
const ApiError = require("../errors/apiError");
const Sequelize = require("sequelize");

class UsersRatingController {
  async getUsersRating(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
  
      // Используем Sequelize.fn для подсчета лайков и дизлайков
      const usersScore = await UserScore.findAll({
        where: { userId: id },
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('likes')), 'totalLikes'],
          [Sequelize.fn('SUM', Sequelize.col('dislikes')), 'totalDislikes'],
        ],
        group: ['userId'], // Группируем по userId
      });
  
      if (usersScore.length === 0) {
        return next(ApiError.badRequest("Оценки не найдены"));
      }
  
      // Получаем результат подсчета
      const totalLikes = usersScore[0].dataValues.totalLikes;
      const totalDislikes = usersScore[0].dataValues.totalDislikes;
  
      return res.json({ totalLikes, totalDislikes });
    } catch (e) {
      return next(ApiError.badRequest("Произошла ошибка"));
    }
  }

  async likeUserRating(req, res, next) {
    try {
      const { id, userId } = req.params;
      if (id == userId) {
        return next(ApiError.badRequest("Нельзя оценить самого себя"));
      }
      let userScore = await UserScore.findOne({
        where: { userId: userId, targetUserId: id },
      });

      if (userScore) {
        if (userScore.likes === 1) {
          await UserScore.destroy({
            where: { userId: userId, targetUserId: id },
          });
          return res.json({ message: "Лайк удален" });
        } else if (userScore.dislikes === 1) {
          await UserScore.update(
            { likes: 1, dislikes: 0 },
            { where: { userId: userId, targetUserId: id } }
          );
          return res.json({ message: "Лайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этого пользователя"));
        }
      }

      await UserScore.create({
        userId: userId,
        targetUserId: id,
        likes: 1,
        dislikes: 0,
      });
      return res.json({ message: "Лайк добавлен" });
    } catch (e) {
      return next(ApiError.badRequest("Произошла ошибка"));
    }
  }

  async dislikeUserRating(req, res, next) {
    try {
      const { id, userId } = req.params;
      if (id == userId) {
        return next(ApiError.badRequest("Нельзя оценить самого себя"));
      }
      let userScore = await UserScore.findOne({
        where: { userId: userId, targetUserId: id },
      });

      if (userScore) {
        if (userScore.dislikes === 1) {
          await UserScore.destroy({
            where: { userId: userId, targetUserId: id },
          });
          return res.json({ message: "Дизлайк удален" });
        } else if (userScore.likes === 1) {
          await UserScore.update(
            { likes: 0, dislikes: 1 },
            { where: { userId: userId, targetUserId: id } }
          );
          return res.json({ message: "Дизлайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этого пользователя"));
        }
      }

      await UserScore.create({
        userId: userId,
        targetUserId: id,
        likes: 0,
        dislikes: 1,
      });
      return res.json({ message: "Дизлайк добавлен" });
    } catch (e) {
      return next(ApiError.badRequest("Произошла ошибка"));
    }
  }
}

module.exports = new UsersRatingController();
