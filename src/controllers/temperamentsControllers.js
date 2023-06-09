const axios = require('axios')
const { URL } = require('../controllers/dogsControllers.js')
const { Dog, Temperaments } = require('../db.js');
const { getAllDogs } = require('./dogsControllers.js')

const getTemperaments = async () => {
    const allArrayDog = await getAllDogs()
    const allTemperaments = allArrayDog.map((el) => el.temperaments)

    for (let i = 0; i < allTemperaments?.length; i++) {
        const arrr = allTemperaments[i]?.split(", ")
        for (let j = 0; j < arrr?.length; j++) {
            await Temperaments.findOrCreate({
                where: { name: arrr[j] },
                defaults: { name: arrr[j] }
            })
        }
    }

    return await Temperaments.findAll()

}


module.exports = { getTemperaments }
















// const axios = require('axios')
// const { URL } = require('../controllers/dogsControllers.js')
// const { Dog, Temperaments } = require('../db.js');
// const { getAllDogs } = require('./dogsControllers.js')
// const array = [
//     'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
//     'Aloof, Clownish, Dignified, Independent, Happy',
//     'Wild, Hardworking, Dutiful',
//     'Outgoing, Friendly, Alert, Confident, Intelligent, Courageous',
//     'Loyal, Independent, Intelligent, Brave',
//     'Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous',
//     'Loving, Protective, Trainable, Dutiful, Responsible',
//     'Friendly, Energetic, Loyal, Gentle, Confident',
//     'Friendly, Affectionate, Devoted, Loyal, Dignified, Playful',
//     'Friendly, Assertive, Energetic, Loyal, Gentle, Confident, Dominant',
//     'Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous',
//     'Friendly, Alert, Reserved, Intelligent, Protective',
//     'Friendly, Alert, Reserved, Intelligent, Protective',
//     'Kind, Sweet-Tempered, Loyal, Independent, Intelligent, Loving',
//     'Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous',
//     'Tenacious, Friendly, Devoted, Loyal, Attentive, Courageous',
//     'Friendly, Energetic, Obedient, Intelligent, Protective, Trainable',
//     'Steady, Bold, Independent, Confident, Intelligent, Proud',
//     'Reliable, Fearless, Energetic, Lively, Self-assured',
//     'Cautious, Energetic, Loyal, Obedient, Protective, Brave',
//     'Friendly, Energetic, Alert, Loyal, Intelligent, Eager',
//     'Good-natured, Affectionate, Intelligent, Active, Protective',
//     'Spirited, Alert, Loyal, Companionable, Even Tempered, Courageous',
//     'Aloof, Affectionate, Attentive, Rugged, Fierce, Refined',
//     'Obedient, Companionable, Intelligent, Joyful',
//     'Affectionate, Energetic, Alert, Curious, Playful, Intelligent',
//     'Affectionate, Lively, Agile, Curious, Happy, Active',
//     'Tenacious, Friendly, Affectionate, Devoted, Sweet-Tempered, Gentle',
//     'Amiable, Even Tempered, Excitable, Determined, Gentle, Intelligent',
//     'Self-confidence, Hardy, Lively, Alert, Intelligent, Active',
//     'Fearless, Friendly, Intelligent, Protective, Calm',
//     'Affectionate, Spirited, Intelligent, Good-tempered',
//     'Watchful, Alert, Stubborn, Friendly, Confident, Hard-working, Active, Protective',
//     'Energetic, Alert, Loyal, Intelligent, Attentive, Protective',
//     'Affectionate, Loyal, Intelligent, Faithful',
//     'Feisty, Affectionate, Cheerful, Playful, Gentle, Sensitive',
//     'Easygoing, Gentle, Adaptable, Trusting, Even Tempered, Lovable',
//     'Stubborn, Affectionate, Gentle, Even Tempered',
//     'Friendly, Intelligent, Active',
//     'Obedient, Confident, Intelligent, Dominant, Territorial',
//     'Tenacious, Keen, Energetic, Responsive, Alert, Intelligent',
//     'Fearless, Affectionate, Alert, Obedient, Intelligent, Even Tempered',
//     'Friendly, Lively, Intelligent',
//     'Protective, Loyal, Gentle, Intelligent, Familial, Rational',
//     'Devoted, Fearless, Friendly, Cheerful, Energetic, Loyal, Playful, Confident, Intelligent, Bright, Brave, Calm',
//     'Friendly, Energetic, Companionable, Intelligent, Eager, Trainable',
//     'Stubborn, Affectionate, Loyal, Playful, Companionable, Trainable',
//     'Fearless, Loyal, Obedient, Intelligent, Faithful, Protective',
//     'Agile, Adaptable, Quick, Intelligent, Attentive, Happy',
//     'Trainable, Protective, Sweet-Tempered, Keen, Active',
//     'Trainable, Protective, Sweet-Tempered, Keen, Active, Territorial',
//     'Docile, Reliable, Devoted, Alert, Loyal, Reserved, Loving, Protective, Powerful, Calm, Courageous',
//     'Hardy, Fearless, Assertive, Gay, Intelligent, Active',
//     'Trainable, Reserved, Stable, Quiet, Even Tempered, Calm',
//     'Affectionate, Devoted, Alert, Companionable, Intelligent, Active',
//     'Energetic, Inquisitive, Independent, Gentle, Intelligent, Loving',
//     'Alert, Quick, Dominant, Powerful, Calm, Strong',
//     'Fearless, Affectionate, Sociable, Patient, Playful, Adaptable',
//     'Affectionate, Intelligent, Quiet, Dominant, Happy, Protective',
//     'Affectionate, Sweet-Tempered, Lively, Alert, Playful, Happy',
//     'Suspicious, Affectionate, Devoted, Reserved, Independent, Loving',
//     'Friendly, Alert, Dignified, Intelligent, Calm',
//     'Aloof, Loyal, Independent, Quiet',
//     'Affectionate, Loyal, Dignified, Gentle, Calm, Great-hearted',
//     'Trainable, Friendly, Affectionate, Playful, Quiet, Faithful',
//     'Outgoing, Sociable, Trusting, Joyful, Even Tempered, Merry',
//     'Affectionate, Lively, Playful, Intelligent, Trainable, Vocal',
//     'Outgoing, Friendly, Energetic, Playful, Sensitive, Intelligent, Active',
//     'Fearless, Energetic, Alert, Loyal, Obedient, Confident, Intelligent',
//     'Friendly, Affectionate, Cheerful, Loyal, Tolerant, Protective',
//     'Reliable, Affectionate, Alert, Loyal, Obedient, Trainable',
//     'Strong Willed, Mischievous, Affectionate, Energetic, Playful, Companionable, Gentle, Hard-working, Intelligent, Eager, People-Oriented',
//     'Kind, Energetic, Independent, Adaptable, Intelligent, Bossy',
//     'Affectionate, Cheerful, Alert, Intelligent, Attentive, Active',
//     'Affectionate, Reserved, Playful, Gentle, Happy, Loving',
//     'Stubborn, Alert, Companionable, Intelligent, Cunning, Trainable',
//     'Alert, Reserved, Intelligent, Even Tempered, Watchful, Calm',
//     'Docile, Cautious, Sociable, Sensitive, Adaptable, Familial',
//     'Friendly, Keen, Faithful, Calm, Courageous',
//     'Playful, Loyal, Independent, Intelligent, Happy, Vocal',
//     'Playful, Affectionate, Keen, Sociable, Lively, Alert, Easygoing, Patient, Athletic, Bright',
//     'Spirited, Lively, Intelligent, Loving, Even Tempered, Familial',
//     'Alert, Loyal, Obedient, Curious, Confident, Intelligent, Watchful, Courageous',
//     'Boisterous, Bold, Affectionate, Intelligent, Cooperative, Trainable',
//     'Strong Willed, Kind, Loyal, Intelligent, Dominant, Powerful',
//     'Spirited, Agile, Loyal, Gentle, Active, Courageous',
//     'Intelligent, Kind, Reliable, Friendly, Trustworthy, Confident',
//     'Fearless, Alert, Loyal, Confident, Gay, Eager',
//     'Friendly, Devoted, Reserved, Gentle, Confident, Loving',
//     'Strong Willed, Fearless, Affectionate, Patient, Gentle, Confident',
//     'Affectionate, Athletic, Gentle, Intelligent, Quiet, Even Tempered',
//     'Self-important, Inquisitive, Alert, Companionable, Sensitive, Watchful',
//     'Outgoing, Friendly, Cheerful, Sweet-Tempered, Tolerant, Active',
//     'Affectionate, Responsive, Playful, Companionable, Gentle, Intelligent',
//     'Affectionate, Energetic, Lively, Independent, Playful, Companionable',
//     'Respectful, Lively, Intelligent, Dominant, Protective, Trainable',
//     'Sweet-Tempered, Loyal, Dignified, Patient, Thoughtful, Generous',
//     'Mischievous, Affectionate, Agile, Athletic, Companionable, Intelligent',
//     'Alert, Loyal, Independent, Intelligent, Loving, Cat-like',
//     'Affectionate, Obedient, Playful, Companionable, Intelligent, Proud',]

// const getTemperaments = (array) => {

//     for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j < array[i].length; j++) {

//         }

//     }
// }
// //console.log(array[0]);

// for (let i = 0; i < array.length; i++) {
//     const arrr = array[i].split(", ")
//     console.log(arrr);
//     for (let j = 0; j < arrr.length; j++) {
//        const findCrea = await Temperaments.findOrCreate({
//         where:{
//             name : arrr[j]
//         }
//        })

//     }

// }


// console.log(getTemperaments(array));


// module.exports = { getTemperaments }