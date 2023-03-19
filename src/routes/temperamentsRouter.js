const { Router } = require('express')
const getTemperamentsHandler = require('../handlers/temperamentsHandler.js')


const temperamentsRouter = Router()

temperamentsRouter.get('/', getTemperamentsHandler)

module.exports = temperamentsRouter