<<<<<<< HEAD
const Incidents = require('../../models/Incidents');
const crypto = require('crypto');

const Ongs = require('../../models/Ongs');
=======
const Incidents = require('../models/Incidents');
const crypto = require('crypto');

//const Ongs = require('../../models/Ongs');
>>>>>>> backend da aplicação

module.exports = {

    async index(request, response) {
        
        // CRIAR PAGINAÇÃO
        const {page = 1} = request.query;
        let limit = 5;
        let skip = limit * (page - 1);

        // CONTAR QUANTOS INCIDENTS TEM AO TOTAL
        const count = await Incidents.countDocuments();


        // const ongs = await Ongs.find().select('name')

        // const incidents = await Incidents.find();
        
        const incidentt = await Incidents.aggregate([
            {
                $lookup: 
                {
                    from: "ongs",localField: "ongs.id",foreignField: "incidents.ong_id",as: "name_ong"
                }
            },
            {   
                $unwind:"$name_ong" 
            },
            {
                $project: {
                    __v: 0,
                    "name_ong.__v": 0,
                    "name_ong._id": 0,
                    "name_ong.ong_id": 0,
                    "name_ong.id": 0
                }
            }, 
        ]).limit(limit).skip(skip)

        
        //mostrar quantidade de casos ao todo
        response.header('X-Total-Count', count) 

        return response.json(incidentt)
    },



    async create(request, response) {
        const { title, description, value } = request.body

        const ong_id = request.headers.authorization

        
        const id = crypto.randomBytes(2).toString('HEX')

        const result = await Incidents.create({
            id,
            title,
            description, 
            value,
            ong_id
        })

 
        return response.json({id})
    },


    async delete(request, response){
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incidents = await Incidents.findOne({
            id: id,
        })

        
        if(incidents.ong_id !== ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        const incident = await Incidents.deleteOne({
            id: id
        })
        //.where('id', id).select('ong_id').first();
        
        //await Incidents.delete().where('id', id).delete()

        return response.status(204).send();

    }
}