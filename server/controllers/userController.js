const { User, Profile } = require("../models/models");
const ApiError = require("../errors/apiError");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { name, surname, email, dataBirth, password, role } = req.body;

    if (!name || !surname || !email || !password || !dataBirth) {
      return next(ApiError.badRequest("Некорректные данные"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 7);
    const user = await User.create({
      name,
      surname,
      email,
      password: hashPassword,
      dataBirth,
      role,
    });
    const profile = await Profile.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token, profile });
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("Пользователь не найден"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });

  }
}

module.exports = new UserController();
