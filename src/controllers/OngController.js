const crypto = require('crypto');

const Ongs = require('../models/Ongs');

module.exports = {
    async index(request, response) {
        const ongs = await Ongs.find()

        return response.json(ongs)
    },


    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX')

        const ongs = await Ongs.create({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })


        return response.json({id});
    }
}