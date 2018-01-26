var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

module.exports = {
    //get all quotes
    getQuotes: function(req, res) {
        Quote.find({}, function(err, quote_list){
            if(err){
                console.log("@err getting quote_list: "+err);
                res.json({
                    message: "couldn't get quote list",
                    error: err
                })
            } else {
                console.log("found quote_list");
                res.json(quote_list);
            }
        })
    },

    //add quote
    addQuote: function(req, res) {
        var newQuote = new Quote ({
            quotetext: req.body.quotetext,
            author: req.body.author
        })
        newQuote.save(function(err, Quote){
            if(err) {
                console.log("@couldn't save Quote: "+err);
                throw err;
            } else {
                console.log("@Quote saved")
                res.json(Quote);
            }
        })
    },

    //edit quote
    updateQuote: function(req, res) {
        console.log("@@@inside updateQuote");
        console.log(req.body,"this is the body")
        Quote.findOneAndUpdate(
            { "_id": req.params._id }, 
            { "$set": { 
                "quotetext": req.body.quotetext,
                "author": req.body.author,
                }
            }, {new: true},function(err, Quote){
          if(err) {
              console.log("@@@error updating Quote: "+err)
              throw err;
          } else {
              console.log("@@@updated Quote")
              res.json(Quote);
          }
        });
      },

    //delete quote
    deleteQuote: function(req, res) {
        Quote.findByIdAndRemove(req.params._id, function(err, Quote){
            if(err){
                console.log("@Couldn't delete Quote: "+err)
                throw err;
            } else {
                console.log("@Deleted Quote");
                res.json(Quote);
            }
        });
    },

    //vote up
    voteUp: function(req, res) {
        Quote.findByIdAndUpdate(req.params._id, { $inc: { votes: 1}}, function(err, Quote) {
            if(err){
                console.log("@Err upvoting: "+err);
                throw err;
            } else {
                console.log("@upvote success");
                res.json(Quote);
            }
        });
    },
    
    //vote down
    voteDown: function(req, res) {
        Quote.findByIdAndUpdate(req.params._id, { $inc: { votes: -1}}, function(err, Quote) {
            if(err){
                console.log("@Err upvoting: "+err);
                throw err;
            } else {
                console.log("@upvote success");
                res.json(Quote);
            }
        });
    }

}