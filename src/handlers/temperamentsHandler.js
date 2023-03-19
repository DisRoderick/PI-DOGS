const { getTemperaments } = require('../controllers/temperamentsControllers.js')

const getTemperamentsHandler = async (req, res) => {

    try {
        const response = await getTemperaments()
        return res.status(200).send(response)

    } catch (error) {
        return res.status(400).send(error.message)
    }


}


module.exports = getTemperamentsHandler