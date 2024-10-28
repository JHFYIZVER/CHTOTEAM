const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const userGameController = require("../controllers/userGameController");
const userRatingController = require("../controllers/usersRatingController");
const authMiddleware = require("../middleware/authMiddleware");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

// User Router

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/:id/addFriend/:friendId", userController.addFriend);
router.post("/:id/acceptFriend/:friendId", userController.acceptFriendRequest);
router.get("/auth", authMiddleware, userController.check);
router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.get("/:id/friend", userController.getFriends);
router.get("/:id/friendRequest", userController.getAllFriendRequests);
router.get("/:id/profile", userController.getProfile);
router.put("/:id/profile", userController.updateProfile);
router.put("/:id", userController.update);
router.put("/:id/verify",checkRoleMiddleware("ADMIN"),userController.verifyUser);
router.delete("/:id", userController.delete);
router.delete("/:id/friend/:friendId", userController.deleteFriend);

// User Rating Router

router.get("/:id/rating", userRatingController.getUsersRating);
router.put("/:id/rating/likes/:userId",userRatingController.likeUserRating);
router.put("/:id/rating/dislikes/:userId",userRatingController.dislikeUserRating);

// User Game Router

router.post("/:id/userGame", userGameController.create);
router.get("/:id/userGame", userGameController.getAll);
router.delete("/:id/userGame", userGameController.delete);

module.exports = router;
