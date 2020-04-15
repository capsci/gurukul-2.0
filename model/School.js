class School {
    constructor() {
        self.name = "My School/College Name";
        self.addressRef = "addressRef";
    }

    validate() {
        if (!this.name)
            throw MESSAGE.EMPTY_FIELD("Name");
    }

    similarQuery() {
        return {
            'name' : this.name,
        };
    }

    async saveToDB() {
        this.validate();
        var dbo = new MongoDBO(Secret.Mongo.url, 'gurukul');
        await dbo.insertIfDoesNotExists(COLLECTION.School, this,
            this.similarQuery()).then((id) => {
                return id;
            });
    }
}
