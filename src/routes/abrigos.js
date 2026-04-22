const express = require("express");
const router = express.Router();

const { cadastrar, listar } = require("../controllers/abrigosController");
const { autenticar } = require("../middlewares/auth");

router.post("/", autenticar, cadastrar);
router.get("/", listar);

module.exports = router;
