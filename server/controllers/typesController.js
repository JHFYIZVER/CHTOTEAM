const ApiError = require("../errors/apiError");
const { Type } = require("../models/models");

class TypesController {
  async create(req, res, next) {
    const { name } = req.body;
    const type = await Type.create({ name });
    if (!name) {
      return next(ApiError.badRequest("Название не может быть пустым"));
    }
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const type = await Type.findByPk(id);
    if (!type) {
      return next(ApiError.badRequest("Тип не найден"));
    }
    return res.json(type);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const type = await Type.update({ name }, { where: { id } });
    if (!type) {
      return next(ApiError.badRequest("Тип не найден"));
    }
    return res.json(type);
  }

  async delete(req, res) {
    const { id } = req.params;
    const type = await TypeGames.destroy({ where: { id } });
    if (!type) {
      return next(ApiError.badRequest("Тип не найден"));
    }
    return res.json(type);
  }
}

module.exports = new TypesController();
