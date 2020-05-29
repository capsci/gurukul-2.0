/*eslint-disable no-useless-escape */
"use strict";

const rules = {
    required: value => !!value || 'Required.',
    noSpaces: value => !value || !value.match(/\s/) || 'Cannot contain spaces',
    wordCharsOnly: value => !value || !!value.match(/^\w+$/) || 'Only valid word characters allowed',
    email: value => !value || !!value.match(/^[\w\+\-\.]+@[\w]+\.[\w]{2,3}$/) || 'Email address not valid',
    phoneNum: value => !value || value.includes("NOT_IN_US") ||!value.match(/[a-zA-Z]/) || 'Cannot contain word characters',
};

const helpers = {
    splitOnWhitespaceAndDelimeters: input => input.split(/[ ,]+/),
};

const sanitize = {
    splitOnWhitespaceAndDelimeters: helpers.splitOnWhitespaceAndDelimeters,
    extractNameFields: (input) => {
        var firstName, middleName, lastName;
        [firstName, middleName, lastName] = helpers.splitOnWhitespaceAndDelimeters(input);
        if (!lastName) {
            lastName = middleName;
            middleName = null;
        }
        return [firstName, middleName, lastName];
    },
};


module.exports = Object.freeze({
    rules: rules,
    sanitize: sanitize,
});
