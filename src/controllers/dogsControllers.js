const axios = require('axios')
require('dotenv').config();
const { APY, APY_KEY } = process.env;
const { Dog, Temperaments } = require('../db');
const { cleanArray } = require('../utilities/utilities')
const { Op } = require('sequelize')

const URL = APY + APY_KEY



const getAllDogs = async () => {
    const response = await axios.get(URL)
    const datos = response.data
    //traigo todos los datos de la api y la guardo en datos
    //limpio los datos que traigo con la funcion cleanArray

    return cleanArray(datos)
}
const getAllDogsDb = async () => {
    const responseDb = await Dog.findAll({ include: Temperaments })
    const dogs = responseDb.map(dog => {
        const cleanedDog = {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            created: true,
            temperaments: dog.temperaments.map(temp => temp.name).join(", "),

        }
        return cleanedDog
    })
    return dogs
}


const searchByNameDb = async (name) => {

    const responseDb = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        },
        include: Temperaments

    })
    const dogs = responseDb.map(dog => {
        const cleanedDog = {
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            created: true,
            temperaments: dog.temperaments.map(temp => temp.name).join(", "),

        }
        return cleanedDog
    })
    return dogs
}

const getSearchByNameApi = async (name) => {
    const nameMinuscula = name.toLowerCase();
    const responseName = await axios.get(URL)
    const dogName = []
    responseName.data.forEach((el) => {

        if (el.name.toLowerCase().includes(nameMinuscula)) {
            const searchDog = {
                id: el.id,
                name: el.name,
                image: el.image.url,
                height: el.height.metric,
                weight: el.weight.metric,
                life_span: el.life_span,
                temperaments: el.temperament
            }
            dogName.push(searchDog)
        }

    })
    return dogName

}


const searchByIdDb = async (id) => {
    const response = await Dog.findByPk(id, {
        include: [{
            model: Temperaments
        }
        ]
    })


    return response.dataValues
}

const createNewDog = async ({ name, image, height, weight, life_span, temperaments }) => {
    const newDog = await Dog.create({ name, image, height, weight, life_span, temperaments })

    const objTemperaments = []
    for (const temperament of temperaments) {

        const temperamentObject = await Temperaments.findOrCreate({
            where: {
                name: temperament
            },
            default: {
                name: temperament
            }
        })

        const [created] = temperamentObject

        objTemperaments.push(created)
    }
    await newDog.addTemperaments(objTemperaments)
    return newDog
}

const searchByIdApi = async (id) => {

    const idInt = parseInt(id)

    const responseApi = await getAllDogs()
    const result = responseApi.find((el) => el.id == idInt)
    return result

}




module.exports = {
    getAllDogs,
    createNewDog,
    searchByNameDb,
    getAllDogsDb,
    getSearchByNameApi,
    searchByIdDb,
    searchByIdApi,
    URL

}