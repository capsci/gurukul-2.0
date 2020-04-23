"use strict";

var REGEX = {
    STRING_INPUT : /^[\w\s-]*$/,
};

var MESSAGE = {
    INVALID_STRING_INPUT : function(user_input, field) {
        return `'${user_input}' is not a valid ${field}. Input can only have a-z,A-Z,0-9,_`;
    },
    EMPTY_FIELD : function(field) {
        return `'${field}' cannot be empty`;
    }
};

var COLLECTION = {
    Address : "Address",
    Applicant : "Applicant",
    Application : "Application",
    Referrer : "Referrer",
    School : "School"
};

module.exports = {
    REGEX,
    MESSAGE,
    COLLECTION
};
