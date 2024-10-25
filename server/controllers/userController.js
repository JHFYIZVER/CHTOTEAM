const {
  User,
  Profile,
  Friends,
  UserScore,
  UserPicture,
} = require("../models/models");
const ApiError = require("../errors/apiError");
const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
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
    await Profile.create({ userId: user.id });
    await UserScore.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async login(req, res, next) {
    try {
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
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    return res.json(user);
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    return res.json(user);
  }

  async update(req, res, next) {
    const { id } = req.params;
    const user = await User.update(req.body, { where: { id } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    return res.json(user);
  }

  async updateProfile(req, res, next) {
    const { id } = req.params;
    try {
      const { photo } = req.files;
      const photoName = uuid.v4() + ".png"; 
      await photo.mv(
        path.resolve(__dirname, "..", "static", "profile", photoName)
      );

      const profile = await Profile.findOne({ where: { userId: id } });
      if (!profile) {
        return next(ApiError.badRequest("Профиль не найден"));
      }
      const userPicture = await UserPicture.create({
        profileId: profile.id,
        url: photoName,
      });
      await Profile.update(
        { UserPictureId: userPicture.id },
        { where: { userId: id } }
      );
      const updatedProfile = await Profile.findOne({
        where: { userId: id },
        include: [{ model: UserPicture, as: "photo" }],
      });

      return res.json(updatedProfile);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async addFriend(req, res, next) {
    try {
      const { id, friendId } = req.params;
      if (id == friendId) {
        return next(ApiError.badRequest("Невозможно добавить себя в друзья"));
      }
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const friend = await User.findOne({ where: { id: friendId } });
      if (!friend) {
        return next(ApiError.badRequest("Профиль не найден"));
      }
      const existingFriend = await Friends.findOne({
        where: {
          [Op.or]: [
            { userId: id, friendId: friendId },
            { userId: friendId, friendId: id },
          ],
        },
      });
      if (existingFriend) {
        return next(
          ApiError.badRequest("Запрос на добавление в друзья уже был отправлен")
        );
      }
      const addFriend = await Friends.create({
        userId: id,
        friendId: friend.id,
      });
      return res.json({ addFriend });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка добавления в друзья"));
    }
  }

  async acceptFriendRequest(req, res, next) {
    try {
      const { id, friendId } = req.params;

      const user = await User.findOne({ where: { id } }); // Находим пользователя, который хочет принять заявку
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const friend = await User.findOne({ where: { id: friendId } }); // Находим пользователя, котороый отправил заявку
      if (!friend) {
        return next(ApiError.badRequest("Профиль не найден"));
      }
      // Проверка наличия существующего запроса на добавление в друзья
      const existingFriend = await Friends.findOne({
        where: {
          userId: friendId, // Проверяем по ID пользователя, которому отправлена заявка
          friendId: id, // Проверяем по ID пользователя, который хочет принять заявку
          status: "pending",
        },
      });
      if (!existingFriend) {
        return next(
          ApiError.badRequest("Запрос на добавление в друзья не найден")
        );
      }
      existingFriend.status = "accepted";
      await existingFriend.save();
      return res.json({ message: "Запрос на добавление в друзья принят" });
    } catch (e) {
      return next(
        ApiError.badRequest("Ошибка принятия запроса на добавление в друзья")
      );
    }
  }

  async deleteFriend(req, res, next) {
    try {
      const { id, friendId } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const friend = await User.findOne({ where: { id: friendId } });
      if (!friend) {
        return next(ApiError.badRequest("Профиль не найден"));
      }
      const existingFriend = await Friends.findOne({
        where: {
          [Op.or]: [
            { userId: id, friendId: friendId },
            { userId: friendId, friendId: id },
          ],
        },
      });
      if (!existingFriend) {
        return next(
          ApiError.badRequest("Запрос на добавление в друзья не найден")
        );
      }
      await existingFriend.destroy();
      return res.json({ message: "Запрос на добавление в друзья удален" });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка удаления из друзей"));
    }
  }

  async getAllFriendRequests(req, res, next) {
    try {
      const { id } = req.params; // ID пользователя, которому пришли запросы
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      // Получаем все запросы, где `friendId` равен ID текущего пользователя
      const friendRequests = await Friends.findAll({
        where: {
          friendId: id, // Получаем все запросы, где `friendId` равен ID текущего пользователя
        },
      });
      if (friendRequests.length === 0) {
        return next(ApiError.badRequest("Заявок на дружбу не найдено"));
      }
      const notAcceptedFriends = friendRequests.filter((friend) => {
        if (friend.status !== "accepted") {
          return friend;
        }
      });
      const friendIdsNotAccepted = notAcceptedFriends.map((friend) => {
        return friend.userId;
      });
      const notAcceptedProfile = await User.findAll({
        where: { id: friendIdsNotAccepted },
        attributes: ["name", "surname", "email"],
      });
      return res.json({
        notAcceptedProfile,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка получения заявок на дружбу"));
    }
  }

  async getFriends(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return next(ApiError.badRequest("Пользователь не найден"));
      }
      const acceptedFriends = await Friends.findAll({
        where: {
          [Op.or]: [{ userId: id }, { friendId: id }],
          status: "accepted",
        },
      });
      if (acceptedFriends.length === 0) {
        return next(ApiError.badRequest("Друзей не найдено"));
      }
      const friendIdsAccepted = acceptedFriends.map((friend) => {
        return friend.friendId;
      });
      const acceptedProfile = await User.findAll({
        where: { id: friendIdsAccepted },
        attributes: ["name", "surname", "email"],
      });

      return res.json({
        acceptedProfile,
      });
    } catch (e) {
      return next(ApiError.badRequest("Ошибка получения друзей"));
    }
  }

  async verifyUser(req, res, next) {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    user.verified = true;
    await user.save();
    return res.json({ message: "Пользователь подтвержден" });
  }

  async getProfile(req, res, next) {
    const { id } = req.params;
    const profile = await Profile.findOne({ where: { userId: id } });
    if (!profile) {
      return next(ApiError.badRequest("Профиль не найден"));
    }
    return res.json(profile);
  }
}

module.exports = new UserController();