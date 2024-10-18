const { Tag } = require("../models/models");
const ApiError = require("../errors/apiError");

class TagsController {
  async create(req, res, next) {
    const { name } = req.body;
    const tag = await Tag.create({ name });
    if (!name) {
      return next(ApiError.badRequest("Название не может быть пустым"));
    }
    return res.json(tag);
  }

  async getAll(req, res) {
    const tags = await Tag.findAll();
    return res.json(tags);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return next(ApiError.badRequest("Тег не найден"));
    }
    return res.json(tag);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const tag = await Tag.update({ name }, { where: { id } });
    if (!tag) {
      return next(ApiError.badRequest("Тег не найден"));
    }
    return res.json(tag);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const tag = await Tag.destroy({ where: { id } });
    if (!tag) {
      return next(ApiError.badRequest("Тег не найден"));
    }
    return res.json(tag);
  }
}

module.exports = new TagsController();
