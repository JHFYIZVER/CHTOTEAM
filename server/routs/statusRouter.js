const Router = require("express");
const router = new Router();
const statusController = require("../controllers/statusController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleware("ADMIN"), statusController.create);
router.get("/:id", statusController.getOne);
router.get("/", statusController.getAll);
router.delete("/:id", statusController.delete);
router.put("/:id", statusController.update);

module.exports = router;
