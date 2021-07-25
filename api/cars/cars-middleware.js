const Cars = require("./cars-model");
const vin = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Cars.getById(req.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    res.status(404).json({
      message: "no such project",
    });
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  try {
    if (!vin) {
      next({ status: 400, message: `vin is missing` });
    } else {
      if (!make) {
        next({ status: 400, message: "make is missing" });
    } else {
      if (!model) {
         next({ status: 400, message: "model is missing" });
    } else {
      if (!mileage) {
         next({ status: 400, message: "mileage is missing" });
    } else {
         next();
          }
        }
      }
    }
  } catch (err) {
    res.status(404).json({
      message: "invalid credentials",
    });
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (!vin.validate(req.body.vin)) {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`,
    });
  } else {
    next()
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const existingVin = await Cars.getByVin(req.body.vin);
    if (!existingVin) {
      next({
        status: 400,
        message: `vin ${req.body.vin} already exists`,
      });
    } else {
      next();
    }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  logger,
};
