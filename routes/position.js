const express = require("express");
const controller = require("./../controllers/position");
const router = express.Router();

// localhos:port/api/auth/login
router.get("/:categoryId", controller.getgetByCategoryId);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
