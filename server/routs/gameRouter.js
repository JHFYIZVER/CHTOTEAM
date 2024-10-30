const Router = require("express");
const router = new Router();
const gameController = require("../controllers/gameController");
const gameRatingController = require("../controllers/gameRatingController");

router.post("/", gameController.create),
router.get("/:id/statistics", gameController.getAllStatistics),
router.get("/", gameController.getAll),
router.get("/:id", gameController.getOne),
router.put("/:id", gameController.update),
router.put("/:id/condition", gameController.changeCondition),
router.put("/:id/like", gameRatingController.gameLike),
router.put("/:id/dislike", gameRatingController.gameDislike),
router.delete("/:id", gameController.delete);

module.exports = router;
