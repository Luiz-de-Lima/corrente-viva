const express = require("express");
const router = express.Router();

const { checkin } = require("../controllers/familiasController");

router.post("/checkin", checkin);

module.exports = router;
