const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/:id/addFriend", userController.addFriend);
router.post("/:id/acceptFriend", userController.acceptFriendRequest);
router.get("/auth", authMiddleware, userController.check);
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.get("/:id/friend", userController.getFriends);
router.get("/:id/friendRequest", userController.getAllFriendRequests);
router.get("/:id/profile");
router.put("/:id", userController.update);
router.put("/:id/verify");
router.delete("/:id", userController.delete);
router.delete("/:id/friend", userController.deleteFriend);

module.exports = router;
