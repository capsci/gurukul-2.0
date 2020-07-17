"use strict";

const genericResponse = function(error, data, response) {
    if (error) {
        sendErrorResponse(error, response);
    }
    else {
        sendDataResponse(data, response);
    }
};

const sendErrorResponse = function(error, response) {
    console.log("ERROR:" + error);
        response
            .status(400)
            .json({error: error});
}

const sendDataResponse = function(data, response) {
    if( !data || data.length == 0 ) {
        response.sendStatus(204);
    }
    else {
        response.json(data);
    }
}

const missingParamResponse = function(paramName, response) {
    var msg = `${paramName} not passed`;
    response.status(400).json({error: msg});
}

module.exports = {
    save: genericResponse,
    find: genericResponse,
    error: sendErrorResponse,
    data: sendDataResponse,
    missingParam: missingParamResponse,
}
