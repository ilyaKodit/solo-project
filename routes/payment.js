const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

let tokenVozovoz = 'LSef8jUF0MJfWq3H6xStqu53wxy3XtGcVNvAdeU5';

// mongoose.connect('mongodb://localhost/soloProject', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

router.get('/', (req, res) => {

    res.render('index');
});

router.post('/token', (req, res) => {

    res.json({tokenVozovoz});
});

router.post('/info', (req, res) => {

    res.render('info', {
        layout: false,
        dispatch: req.body.dispatchLocation,
        destination: req.body.destinationLocation,
        quantity: req.body.quantity,
        volume: req.body.volume,
        weight: req.body.weight,
        basePrice: req.body.basePrice,
        price: req.body.price,
        serviceName0: req.body.serviceName0,
        servicePrice0: req.body.servicePrice0,
        serviceName1: req.body.serviceName1,
        servicePrice1: req.body.servicePrice1,
        serviceName2: req.body.serviceName2,
        servicePrice2: req.body.servicePrice2,
    });
});



module.exports = router;
