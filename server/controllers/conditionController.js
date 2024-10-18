const ApiError = require("../errors/apiError");
const { Condition } = require("../models/models");

class ConditionController {
  async create(req, res, next) {
    const { name } = req.body;
    const condition = await Condition.create({ name });
    if (!name) {
      return next(ApiError.badRequest("Название не может быть пустым"));
    }
    return res.json(condition);
  }

  async getAll(req, res) {
    const conditions = await Condition.findAll();
    return res.json(conditions);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const condition = await Condition.findByPk(id);
    if (!condition) {
      return next(ApiError.badRequest("Условие не найдено"));
    }
    return res.json(condition);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const condition = await Condition.update({ name }, { where: { id } });
    if (!condition) {
      return next(ApiError.badRequest("Условие не найдено"));
    }
    return res.json(condition);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const condition = await Condition.destroy({ where: { id } });
    if (!condition) {
      return next(ApiError.badRequest("Условие не найдено"));
    }
    return res.json(condition);
  }
}

module.exports = new ConditionController();
