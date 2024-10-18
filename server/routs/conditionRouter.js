const Router = require("express");
const router = new Router();
const conditionController = require("../controllers/conditionController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/", checkRoleMiddleware("ADMIN"), conditionController.getAll),
  router.get("/:id", conditionController.getOne),
  router.post("/", conditionController.create);
router.put("/:id", conditionController.update);
router.delete("/:id", conditionController.delete);

module.exports = router;
