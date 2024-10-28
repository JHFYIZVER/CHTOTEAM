const ApiError = require("../errors/apiError");
const {
  Comment,
  ReplyComment,
  CommentScore,
  ReplyCommentScore,
  User,
} = require("../models/models");

class CommentController {
  async create(req, res, next) {
    try {
      const { text, gameId, userId } = req.body;
      if (!text) {
        return next(ApiError.badRequest("Текст не может быть пустым"));
      }
      if (!gameId) {
        return next(
          ApiError.badRequest("Идентификатор игры не может быть пустым")
        );
      }
      if (!userId) {
        return next(
          ApiError.badRequest("Идентификатор пользователя не может быть пустым")
        );
      }
      const commentScore = await CommentScore.create({
        commentId: null,
      });
      const comment = await Comment.create({
        text,
        gameId,
        userId,
        commentScoreId: commentScore.id,
      });
      await commentScore.update({ commentId: comment.id });
      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async likeComment(req, res, next) {
    try {
      const { id, commentId } = req.body; // ID пользователя и комментария
      let commentScore = await CommentScore.findOne({
        where: { userId: id, commentId },
      });
      if (commentScore) {
        if (commentScore.likes === 1) {
          await CommentScore.destroy({
            where: { userId: id, commentId },
          });
          return res.json({ message: "Лайк удален" });
        } else if (commentScore.dislikes === 1) {
          await CommentScore.update(
            { likes: 1, dislikes: 0 },
            { where: { userId: id, commentId } }
          );
          return res.json({ message: "Лайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этот комментарий"));
        }
      }

      await CommentScore.create({
        userId: id,
        commentId,
        likes: 1,
        dislikes: 0,
      });
      return res.json({ message: "Лайк добавлен" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async dislikeComment(req, res, next) {
    try {
      const { id, commentId } = req.body; // ID пользователя и комментария
      let commentScore = await CommentScore.findOne({
        where: { userId: id, commentId },
      });
      if (commentScore) {
        if (commentScore.dislikes === 1) {
          await CommentScore.destroy({
            where: { userId: id, commentId },
          });
          return res.json({ message: "Дизлайк удален" });
        } else if (commentScore.likes === 1) {
          await CommentScore.update(
            { likes: 0, dislikes: 1 },
            { where: { userId: id, commentId } }
          );
          return res.json({ message: "Дизлайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этот комментарий"));
        }
      }
      await CommentScore.create({
        userId: id,
        commentId,
        likes: 0,
        dislikes: 1,
      });
      return res.json({ message: "Дизлайк добавлен" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const { id } = req.params;
      let { page = 1, limit = 2 } = req.query;

      const comments = await Comment.findAll({
        where: { gameId: id },
        attributes: ["id", "text", "userId", "createdAt"],
        include: [
          {
            model: CommentScore,
            attributes: ["likes", "dislikes"],
          },
        ],
        order: [["createdAt", "ASC"]],
        offset: (page - 1) * limit,
        limit: limit,
      });

      const updatedComments = comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        userId: comment.userId,
        createdAt: comment.createdAt,
        likes: comment.commentScore?.likes ?? 0,
        dislikes: comment.commentScore?.dislikes ?? 0,
      }));

      const totalComments = await Comment.count({ where: { gameId: id } });
      const hasMoreComments = totalComments > page * limit;

      return res.json({
        comments: updatedComments,
        hasMoreComments,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getReplies(req, res, next) {
    try {
      const { commentId } = req.body; // ID комментария
      let { page = 1, limit = 1 } = req.query;
      const offset = (page - 1) * limit;
      const comment = await Comment.findOne({ where: { id: commentId } });

      if (!comment) {
        return res.json({message: "Комментарий не найден"});
      }

      if (page < 1 && limit < 1) {
        return next(
          ApiError.badRequest("Page and limit must be positive integers.")
        );
      }
      const replies = await ReplyComment.findAll({
        where: { commentId: commentId },
        attributes: [
          "id",
          "userId",
          "text",
          "commentId",
          "createdAt",
          "parentReplyId",
        ],
        order: [["createdAt", "ASC"]],
        offset: offset,
        limit: limit,
        include: [
          {
            model: ReplyCommentScore,
            attributes: ["likes", "dislikes"],
          },
        ],
      });
      const updatedReplies = replies.map((reply) => {
        const totalScore = reply.replyCommentScores.reduce(
          (acc, score) => {
            acc.likes += score.likes;
            acc.dislikes += score.dislikes;
            return acc;
          },
          { likes: 0, dislikes: 0 }
        );

        return {
          id: reply.id,
          userId: reply.userId,
          text: reply.text,
          commentId: reply.commentId,
          parentReplyId: reply.parentReplyId,
          createdAt: reply.createdAt,
          likes: totalScore.likes,
          dislikes: totalScore.dislikes,
        };
      });

      const totalReplies = await ReplyComment.count({
        where: { commentId: commentId },
      });
      const hasMoreReplies = totalReplies > page * limit;

      return res.json({
        replies: updatedReplies,
        hasMoreReplies,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const comment = await Comment.destroy({ where: { id } });
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
  }

  async createReply(req, res, next) {
    try {
      const { text, commentId, userId, parentReplyId } = req.body;
      if (!text) {
        return next(ApiError.badRequest("Текст ответа не может быть пустым"));
      }
      if (!commentId) {
        return next(
          ApiError.badRequest("Идентификатор комментария не может быть пустым")
        );
      }
      if (!userId) {
        return next(
          ApiError.badRequest("Идентификатор пользователя не может быть пустым")
        );
      }
      const replyScore = await ReplyCommentScore.create({
        replyId: null,
      });
      const reply = await ReplyComment.create({
        text,
        commentId,
        userId,
        parentReplyId,
        commentScoreId: replyScore.id,
      });
      await replyScore.update({ replyId: reply.id });
      return res.json(reply);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async likeReply(req, res, next) {
    try {
      const { id, replyId } = req.body; // ID пользователя и комментария
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      let replyScore = await ReplyCommentScore.findOne({
        where: { userId: id, replyId },
      });
      if (replyScore) {
        if (replyScore.likes === 1) {
          await ReplyCommentScore.destroy({
            where: { userId: id, replyId },
          });
          return res.json({ message: "Лайк удален" });
        } else if (replyScore.dislikes === 1) {
          await ReplyCommentScore.update(
            { likes: 1, dislikes: 0 },
            { where: { userId: id, commenreplyIdtId } }
          );
          return res.json({ message: "Лайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этот комментарий"));
        }
      }

      await ReplyCommentScore.create({
        userId: id,
        replyId,
        likes: 1,
        dislikes: 0,
      });
      return res.json({ message: "Лайк добавлен" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async dislikeReply(req, res, next) {
    try {
      const { id, replyId } = req.body; // ID пользователя и комментария
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      let replyScore = await ReplyCommentScore.findOne({
        where: { userId: id, replyId },
      });
      if (replyScore) {
        if (replyScore.dislikes === 1) {
          await ReplyCommentScore.destroy({
            where: { userId: id, replyId },
          });
          return res.json({ message: "Дизлайк удален" });
        } else if (replyScore.likes === 1) {
          await ReplyCommentScore.update(
            { likes: 0, dislikes: 1 },
            { where: { userId: id, replyId } }
          );
          return res.json({ message: "Дизлайк добавлен" });
        } else {
          return next(ApiError.badRequest("Вы уже оценили этот комментарий"));
        }
      }
      await ReplyCommentScore.create({
        userId: id,
        replyId,
        likes: 0,
        dislikes: 1,
      });
      return res.json({ message: "Дизлайк добавлен" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteReply(req, res, next) {
    const { id } = req.params;
    const reply = await ReplyComment.destroy({ where: { id } });
    if (!reply) {
      return next(ApiError.badRequest("Ответ не найден"));
    }
    return res.json(reply);
  }
}

module.exports = new CommentController();
