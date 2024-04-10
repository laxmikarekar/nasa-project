const express = require('express');

const planetsRouter = express.Router();

//const planetsController = require('./planets.controller');

/*-- Another way --*/
const {
    httpGetAllPlanets
} = require('./planets.controller');

planetsRouter.get('/',httpGetAllPlanets);

module.exports = planetsRouter;