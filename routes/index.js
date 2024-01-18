
import express from 'express'
import verificacion from './verificacion.js'
import consulta from './consultas.js'
let router = express.Router();


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/consulta', consulta)
router.use('/verificacion', verificacion)

export default router