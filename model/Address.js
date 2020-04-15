"use strict";

const REGEX = require("./../gurukul/Constants").REGEX;
const MESSAGE = require("./../gurukul/Constants").MESSAGE;
const COLLECTION = require("./../gurukul/Constants").COLLECTION;
var Secret = require('./../secret/Constants');
var MongoDBO = require('./../gurukul/3pinterface/MongoDBO');

module.exports = class Address {
    constructor() {
        // this.line1 = "Addrefgsss Line w11";
        // this.line2 = "Awddress Lidnde 22";
        // this.city = "City fdNam3e";
        // this.state = "State/fdTe45rritory name";
        // this.zipcode = 123564; //pinnumber
        // this.country = "Countr3yName";
    }

    validate() {
        if (!this.line1)
            throw MESSAGE.EMPTY_FIELD("AddressLine1");
        if (!this.city)
            throw MESSAGE.EMPTY_FIELD("City");
        if (!this.state)
            throw MESSAGE.EMPTY_FIELD("State/Territory");
        if (!this.zipcode)
            throw MESSAGE.EMPTY_FIELD("ZipCode");
        if (!this.country)
            throw MESSAGE.EMPTY_FIELD("country");
    }

    async saveToDB() {
        this.validate();
        var dbo = new MongoDBO(Secret.Mongo.url, 'gurukul');
        await dbo.insertIfDoesNotExists(COLLECTION.Address, this, this)
            .then((id) => {
                return id;
            });
    }
}
