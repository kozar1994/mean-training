const express = require("express");
const controller = require("./../controllers/order");
const router = express.Router();

// localhos:port/api/auth/login
router.get("/",passport.authenticate("jwt", { session: false }), controller.getAll);
router.post("/",passport.authenticate("jwt", { session: false }), controller.create);

module.exports = router;
