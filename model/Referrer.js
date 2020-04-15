class Referrer {
    constructor (ref) {
        this.id = ref;
        this.name = "MyReferee Full Name";
        this.position = "President/Member";
        this.organization = "Organization";
        this.addressRef = "addressRef";
        this.phoneNumPrimary = "919";
        this.phoneNumSecondary = "095";
        this.emailPrimary = "ref1@gmail.com";
        this.emailSecondary = "ref1sec@gmail.com";
        this.notes = "";
    }

    validate() {
        if (!this.name)
            throw MESSAGE.EMPTY_FIELD("Name");
        if (!this.organization)
            throw MESSAGE.EMPTY_FIELD("Organization");
        if (!this.phoneNumPrimary)
            throw MESSAGE.EMPTY_FIELD("Primary Phone Number");
        if (!this.emailPrimary)
            throw MESSAGE.EMPTY_FIELD("Primary Email");
    }

    // Unique values which will determine if 2 documents are the same
    similarQuery() {
        return {
            'name' : this.name,
            'organization' : this.organization,
            'emailPrimary' : this.emailPrimary
        };
    }

    async saveToDB() {
        this.validate();
        var dbo = new MongoDBO(Secret.Mongo.url, 'gurukul');
        await dbo.insertIfDoesNotExists(COLLECTION.Referrer, this,
            this.similarQuery()).then((id) => {
                return id;
            });
    }
}
