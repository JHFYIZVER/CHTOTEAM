const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const gameRouter = require("./gameRouter");
const tagsRouter = require("./tagsRouter");
const conditionRouter = require("./conditionRouter");
const typesGameRouter = require("./typesGameRouter");
const statusRouter = require("./statusRouter");
const commentRouter = require("./commentRouter");

router.use("/user", userRouter);
router.use("/comment", commentRouter);
router.use("/game", gameRouter);
router.use("/tags", tagsRouter);
router.use("/status", statusRouter);
router.use("/condition", conditionRouter);
router.use("/types", typesGameRouter);

module.exports = router;
