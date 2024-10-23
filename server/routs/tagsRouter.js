const Router = require("express");
const router = new Router();
const tagsController = require("../controllers/tagsController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/", tagsController.getAll),
router.get("/:id", tagsController.getOne),
router.post("/", checkRoleMiddleware("ADMIN"), tagsController.create);
router.put("/:id", tagsController.update);
router.delete("/:id", tagsController.delete);

module.exports = router;
