const mongoose = require('mongoose')

const koreanvarlogschema = new mongoose.Schema( {
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


const koreanvarlog = mongoose.model('koreanvarlog', koreanvarlogschema);
module.exports = koreanvarlog ;

    // response: {
    //     Q0: String
    //   },
