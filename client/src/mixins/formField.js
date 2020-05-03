"use strict";

export const formField = {
    methods: {
        splitOnWhitespaceAndDelimeters: function(input) {
            return input.split(/[ ,]+/);
        },
        splitOnDelimeter: function(input, delimiters) {
            let re = new RegExp("/["+delimiters+"]+/", "g");
            return input.split(re);
        },
        splitOnNewline: function(input) {
            return input.split(/[\r?\n]+/);
        },
        extractNameFields: function(input) {
            var firstName, middleName, lastName;
            [firstName, middleName, lastName] = this.splitOnWhitespaceAndDelimeters(input);
            if (!lastName) {
                lastName = middleName;
                middleName = null;
            }
            return [firstName, middleName, lastName];
        },
        camelize: function(input) {
            return input.replace(/[\w']/g, function(match) {
                return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
            });
        },
        extractEmail: function(input) {
            return input
                .match(/([\w._]+@[\w._]+\.[\w._-]+)/gi);
        },
    }
};
