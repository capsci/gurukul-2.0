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
    }
};
