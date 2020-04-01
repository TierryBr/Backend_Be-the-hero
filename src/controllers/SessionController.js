const Ongs = require('../models/Ongs');


// VERIFICAR SE A ONG EXISTE OU NÃO
module.exports = {
    async create(request, response) {
        const { id } = request.body

        const ong = await Ongs.findOne({
            id: id,
        }).select('name')
        
        if(!ong) {
            return response.status(408).json({ error: 'No ONG found witch this ID'})
        }

        return response.json(ong)
    },

}