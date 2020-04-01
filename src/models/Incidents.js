const mongoose = require('mongoose')

const IncidentSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    value: String,
    ong_id: {
        type: String,
        ref: 'Ongs'
    }

})

module.exports = mongoose.model('Incidents', IncidentSchema)