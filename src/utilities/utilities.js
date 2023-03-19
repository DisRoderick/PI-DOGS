const cleanArray = (array) => {
    const newArray = []
    array.forEach(element => {
        let dogsClean = {
            id: element.id,
            name: element.name,
            image: element.image.url,
            heigth: element.height.metric,
            weight: element.weight.metric,
            life_span: element.life_span,
            temperaments: element.temperament
        }
        newArray.push(dogsClean)
    });

    return newArray

}

const verifyId = (id) => {
    if (isNaN(id)) {
        return 'string'
    }
    else {
        return 'number'
    }
}



module.exports = { cleanArray, verifyId }