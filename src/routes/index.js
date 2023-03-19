const { Router } = require('express');
const temperamentsRouter = require('./temperamentsRouter.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogsRouter.js')


const router = Router();

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
