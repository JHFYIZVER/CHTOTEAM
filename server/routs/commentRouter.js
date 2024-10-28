const Router = require("express");
const router = new Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:id", commentController.getAll),
router.get("/:id/replies", commentController.getReplies);
router.post("/", commentController.create);
router.delete("/:id", commentController.delete);
router.post("/reply", commentController.createReply);
router.delete("/reply/:id", commentController.deleteReply);
router.put("/like", commentController.likeComment);
router.put("/dislike", commentController.dislikeComment);
router.put("/reply/like", commentController.likeReply);
router.put("/reply/dislike", commentController.dislikeReply);

module.exports = router;
