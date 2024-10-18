const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");

router.get("/", commentController.getAll),
router.get("/:id", commentController.getOne),
router.post("/", commentController.create);
router.delete("/:id", commentController.delete);
router.post("/reply", commentController.createReply);
router.delete("/reply/:id", commentController.deleteReply);
router.get("/reply", commentController.getReplies);

module.exports = router;
