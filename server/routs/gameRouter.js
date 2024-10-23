const Router = require("express");
const router = new Router();
const gameController = require("../controllers/gameController");

router.post("/", gameController.create),
router.post("/:id/ratings")
router.get("/", gameController.getAll),
router.get("/:id", gameController.getOne),
router.get("/:id/tags")
router.get("/:id/pictures")
router.put("/:id", gameController.update),
router.put("/:id/staus")
router.delete("/:id", gameController.delete);

module.exports = router;