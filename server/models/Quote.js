const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new mongoose.Schema({
    quotetext: {
        type: String,
        required: [true, "missing quotetext"],
        minlength: 10,
        maxlength: 300
    },
    author: {
        type: String,
        required: [true, "missing author"],
        minlength: 3,
        maxlength: 30
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: true });

var Quote = mongoose.model('Quote', QuoteSchema);