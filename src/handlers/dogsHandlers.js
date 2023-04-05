const { getAllDogs, createNewDog, searchByNameDb, getAllDogsDb, getSearchByNameApi, searchByIdDb, searchByIdApi } = require('../controllers/dogsControllers.js')
const { verifyId } = require('../utilities/utilities.js')

const getDogshandler = async (req, res) => {
    const { name } = req.query
    try {
        //si no recibo name me traigo todo el array de objetos
        if (!name) {
            const responseApi = await getAllDogs()
            const responseDb = await getAllDogsDb()

            res.status(200).json(responseDb.concat(responseApi))
        }
        else {
            const responseNameDb = await searchByNameDb(name)
            const responseNameApi = await getSearchByNameApi(name)
            const combined = responseNameDb.concat(responseNameApi)
            if (combined.length === 0) throw Error('No existe esa Raza de perro')
            else return res.status(200).json(combined)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const getDogsByIdHandler = async (req, res) => {
    const { id } = req.params;

    try {
        if (verifyId(id) === 'string') {

            const responseDb = await searchByIdDb(id);
            if (responseDb) {
                return res.status(200).send(responseDb);
            }
            else return res.status(400).send(`No existe raza con ID: ${id}`)
        }

        else if (verifyId(id) === 'number') {
            const responseApi = await searchByIdApi(id);

            if (responseApi) {
                return res.status(200).send(responseApi);
            } else {
                return res.status(404).send(`No existe raza con ID: ${id}`);
            }
        }
        return res.status(404).send(`No existe raza con ID ${id}`);
    } catch (error) {
        res.status(500).send(`No existe raza con ID: ${id}`);
    }
};




const createDogsHandler = async (req, res) => {
    const { name, image, height, weight, life_span, temperaments } = req.body


    try {
        if (!name || !image || !height || !weight || !life_span || temperaments.length === 0) {

            throw Error('Faltan datos para crear un nuevo perro')
        }

        const newDog = await createNewDog({ name, image, height, weight, life_span, temperaments })
        return res.status(201).send(newDog)

    } catch (error) {
        res.status(400).send(error.message)
    }

}

module.exports = {
    getDogshandler,
    getDogsByIdHandler,
    createDogsHandler
}