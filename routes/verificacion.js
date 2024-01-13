import express from "express";
import { enviarCorreoVerificacion } from '../controllers/verificacion.js';

const router = express.Router();

// Utiliza la función post para manejar las solicitudes POST a esta ruta
router.post("/", enviarCorreoVerificacion);

export default router;
