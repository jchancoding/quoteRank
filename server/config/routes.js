const quotes = require('../controllers/quotes.js');
path = require('path');

module.exports = function(app) {

    //get all quotes
    app.get("/quotes", function(req, res){
        quotes.getQuotes(req, res);
    })

    //add a quote
    app.post("/quote/add", function(req, res){
        quotes.addQuote(req, res);
    })

    //update one quote
    app.put("/quote/update/:_id", function(req, res){
        quotes.updateQuote(req, res);
    })

    //delete a quote
    app.delete('/quote/delete/:_id', function(req, res){
        quotes.deleteQuote(req, res);
    })

    //vote a quote up
    app.put('/quote/up/:_id', function(req, res){
        quotes.voteUp(req, res);
    })

    //vote a quote down
    app.put('/quote/down/:_id', function(req, res){
        quotes.voteDown(req, res);
    })

    app.all("*", function(req, res) { 
        res.sendFile(path.resolve("./client/dist/index.html")) 
    });
}