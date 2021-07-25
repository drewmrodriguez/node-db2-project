// DO YOUR MAGIC
const express = require('express');
const mw = require("./cars-middleware");
const Cars = require("./cars-model");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll();
        res.json(cars);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', mw.checkCarId, async (req, res, next) => {
    Cars.getById(req.params.id)
        .then((car) => {
            res.json(car);
        })
        .catch(next);
});

router.post('/', mw.checkCarPayload, mw.checkVinNumberValid, mw.checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        res.status(201).json(newCar);
    } catch (err) {
        next(err);
    }
});

module.exports = router;