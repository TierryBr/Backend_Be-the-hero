<<<<<<< HEAD
const Incidents = require('../../models/Incidents');
=======
const Incidents = require('../models/Incidents');
>>>>>>> backend da aplicação

// rota para lista o caso de apenas uma ONG
module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization

        const incidents = await Incidents.find({
            ong_id: ong_id
        })
        

        return response.json(incidents)
    }
}