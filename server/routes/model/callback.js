"use strict";

const genericResponse = function(error, data, response) {
    if (error) {
        response
            .status(400)
            .json({error: error});
    }
    else {
        if( !data || data.length == 0 ) {
            response
                .sendStatus(204);
            return;
        }
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
