const { Router } = require('express')

const {
    getDogshandler,
    getDogsByIdHandler,
    createDogsHandler } = require('../handlers/dogsHandlers.js')

const dogsRouter = Router()

dogsRouter.get('/', getDogshandler)
dogsRouter.get('/:id', getDogsByIdHandler)
dogsRouter.post('/', createDogsHandler)

module.exports = dogsRouter