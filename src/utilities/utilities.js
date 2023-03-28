const cleanArray = (array) => {
    const newArray = []
    array.forEach(element => {
        let dogsClean = {
            id: element.id,
            name: element.name,
            image: element.image.url,
            height: element.height.metric,
            weight: element.weight.metric,
            life_span: element.life_span,
            temperaments: element.temperament,
            created: false
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