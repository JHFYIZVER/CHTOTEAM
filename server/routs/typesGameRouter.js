const Router = require("express");
const router = new Router();
const typesController = require("../controllers/typesController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get("/", typesController.getAll),
  router.get("/:id", typesController.getOne),
  router.post("/", checkRoleMiddleware("ADMIN"), typesController.create);
router.put("/:id", typesController.update);
router.delete("/:id", typesController.delete);

module.exports = router;
