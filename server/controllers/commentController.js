const ApiError = require("../errors/apiError");
const { Comment, ReplyComment } = require("../models/models");

class CommentController {
  async create(req, res, next) {
    try {
      const { text, gameId, userId } = req.body;
      const comment = await Comment.create({ text, gameId, userId });
      return res.json(comment);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const comments = await Comment.findAll();
    return res.json(comments);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return next(ApiError.badRequest("Комментарий не найден"));
    }
    return res.json(comment);
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
      const { text, commentId, userId } = req.body;
      const reply = await ReplyComment.create({ text, commentId, userId });
      return res.json(reply);
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

  async getReplies(req, res, next) {
    const { commentId } = req.params;
    const replies = await ReplyComment.findAll({ where: { commentId } });
    if (!replies) {
      return next(ApiError.badRequest("Ответы не найдены"));
    }
    return res.json(replies);
  }
}

module.exports = new CommentController();
