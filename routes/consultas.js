import express from 'express'
import controller from '../controllers/enviarConsulta/consulta.js'

import consultaSchemas from "../schemas/consulta.js";


let router = express.Router();
const { consulta } = controller;
router.post("/", consulta);
export default router;