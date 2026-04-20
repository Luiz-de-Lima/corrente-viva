const express=require('express')
const router=express.Router()

const {cadastrar}=require('../controllers/responsaveisController')

router.post("/",cadastrar)

module.exports=router