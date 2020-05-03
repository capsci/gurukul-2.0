"use strict";

const genericResponse = function(error, data, response) {
    if (error) {
        response
            .status(400)
            .json({error: error});
    }
    else {
        response
            .json(data);
    }
};

const missingParamResponse = function(paramName, response) {
    var msg = `${paramName} not passed`;
    response.status(400).json({error: msg});
}

module.exports = {
    save: genericResponse,
    find: genericResponse,
    missingParam: missingParamResponse,
}
