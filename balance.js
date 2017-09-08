var express = require('express'),
    router = express.Router()


router.get('/', function (req, res,next) {

    console.log("YOU ARE LOGGED IN");

    res.json({
        success: true,
        token:"abcd-efgh-delmn-ohtr-stuo",
        result: {
            name: "Domenico",
            balance: 100,
            currency: "EUR",
            message: "You are really poor! :P"
        }
    });

});

module.exports = router;