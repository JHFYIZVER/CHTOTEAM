const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/users/:id/friends/:id");
router.get("/auth", authMiddleware, userController.check);
router.get("/");
router.get("/:id");
router.get("/:id/friends");
router.get("/:id/profile");
router.put("/:id");
router.put("/:id/verify");
router.delete("/:id");
router.delete("/:id/friends/:id");

module.exports = router;
