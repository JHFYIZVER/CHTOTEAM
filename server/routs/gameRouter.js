const Router = require("express");
const router = new Router();
const gameController = require("../controllers/gameController");

router.post("/", gameController.create),
router.get("/:id/statistics", gameController.getAllStatistics),
router.get("/", gameController.getAll),
router.get("/:id", gameController.getOne),
router.get("/:id/pictures")
router.put("/:id", gameController.update),
router.delete("/:id", gameController.delete);

module.exports = router;