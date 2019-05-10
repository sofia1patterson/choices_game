const mongoose = require("mongoose")
var count = require("./../controllers/choiceControl.js")

module.exports = function(app) {
    app.get("/game", count.index);
    app.post("/game", count.reset),
    app.put("/game/one", count.yellowButton);
    app.put("/game/two", count.redButton);
    app.post("/user", count.user);
    app.get("/user", count.check);
    app.post('/message', count.message);
    app.get('/message', count.getMessages);
    app.get('/session', count.session);
    app.post("/choices", count.choices);
    app.get("/choices", count.getChoices);
    
    // app.get("/product/:id", product.showOne)
    // app.put("/product/:id", product.updateOne)
    // app.delete("/product/:id", product.delete)
}