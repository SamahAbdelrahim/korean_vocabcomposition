const mongoose = require('mongoose')

const categoryschema = new mongoose.Schema( {
    rt: Number,
    trial_type: String,
    trial_index: Number,
    time_elapsed: Number,
    internal_node_id: Number,
    subject: String,
    response: String,
    theword: String,
    block: String,
    study_id: String,
    session_id: String,
}) ;


const category = mongoose.model('category', categoryschema);
module.exports = category ;