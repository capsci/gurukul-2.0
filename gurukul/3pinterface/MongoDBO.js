"use strict";

/*
API Documentation:
    https://docs.mongodb.com/manual/reference/method/js-collection/
*/

var MongoClient = require('mongodb').MongoClient;
var Assert = require('assert');

module.exports = class MongoDBO {

    constructor(url, database) {
        this.url = url;
        this.database = database;
    }

    // Returns List of Documents
    async readAll(collection) {
        var client = await MongoClient.connect(this.url);
        var db = client.db(this.database);
        var ret = await db.collection(collection).find().toArray();
        client.close();
        return ret;
    }

    // Returns List of Documents
    async search(collection, query) {
        var client = await MongoClient.connect(this.url);
        var db = client.db(this.database);
        var ret = await db.collection(collection).find(query).toArray();
        client.close();
        return ret;
    }

    // Returns List of Documents
    async insert(collection, document) {
        var client = await MongoClient.connect(this.url);
        var db = client.db(this.database);
        var ret = await db.collection(collection).insertOne(document);
        client.close();
        return ret;
    }

    // Returns WriteResult document which contains status of operation
    async update(collection, query, updatedFields) {
        var client = await MongoClient.connect(this.url);
        var db = client.db(this.database);
        var ret = await db.collection(collection).update(query, updatedFields);
        client.close();
        return ret;
    }
}
