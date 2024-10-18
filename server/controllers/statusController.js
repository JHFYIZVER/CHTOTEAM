const ApiError = require("../errors/apiError");
const { Status } = require("../models/models");

class StatusController {
  async create(req, res, next) {
    const { name } = req.body;
    const status = await Status.create({ name });
    if (!name) {
      return next(ApiError.badRequest("Название не может быть пустым"));
    }
    return res.json(status);
  }

  async getAll(req, res) {
    const statuses = await Status.findAll();
    return res.json(statuses);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) {
      return next(ApiError.badRequest("Статус не найден"));
    }
    return res.json(status);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    const status = await Status.update({ name }, { where: { id } });
    if (!status) {
      return next(ApiError.badRequest("Статус не найден"));
    }
    return res.json(status);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const status = await Status.destroy({ where: { id } });
    if (!status) {
      return next(ApiError.badRequest("Статус не найден"));
    }
    return res.json(status);
  }
}

module.exports = new StatusController();
