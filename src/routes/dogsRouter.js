const { Router } = require('express')

const {
    getDogshandler,
    getDogsByIdHandler,
    getDogsByNameHandler,
    createDogsHandler } = require('../handlers/dogsHandlers.js')

const dogsRouter = Router()


dogsRouter.get('/', getDogshandler)

dogsRouter.get('/:id', getDogsByIdHandler)


dogsRouter.get('/', getDogsByNameHandler)

dogsRouter.post('/', createDogsHandler)





module.exports = dogsRouter