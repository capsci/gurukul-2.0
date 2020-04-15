class Applicant {
    constructor() {
        self.name = "FirstName"; // Format: FirstName MiddleName LastName
        self.phoneNumPrimary = "919"; // US if possible
        self.phoneNumSecondary = "095";
        self.emailPrimary = "applicant@gmail.com";
        self.emailSecondary = "applicantalternate@gmail.com";
        self.schoolRef = "schoolRef";  //US Collge or Uninversity
        self.scholarshipSemester = "Fall 2020"; //Format: [Spring|Fall] 20\d{2}
        self.referrer1Ref = "referrer1Ref";
        self.referrer2Ref = "referrer2Ref";
        self.notes = "";
        self.applicationRef = "applicationRef";
    }

    validate() {
        if (!this.name)
            throw MESSAGE.EMPTY_FIELD("Name");
        if (!this.phoneNumPrimary)
            throw MESSAGE.EMPTY_FIELD("Primary Phone Num");
        if (!this.emailPrimary)
            throw MESSAGE.EMPTY_FIELD("Primary Email");
    }
}
