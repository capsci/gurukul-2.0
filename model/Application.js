class Application {
    constructor() {
        self.applicantRef = "applicantRef";
        self.dob = "01-01-1990"; //valid date format over 18 years
        self.usVisaStatus = "requestedF1"; //from predefined values
        self.inUSA = false;
        self.entryDateInUSA = "2020-08-21";
        self.linkedinProfile = "linkToLinkedIn";
        self.facebookProfile = "linkToFacebook";
        self.permanentAddress = "permanentAddressRef"; //HomeAddress
        self.usAddress = "usAddressRef";
        self.prevEducation = [
            {schoolRef: "schoolRef", major: "Degree/Major/Certificate", grade: "GPA/Grade"},
            {schoolRef: "schoolRef", major: "Degree/Major/Certificate", grade: "GPA/Grade"}
        ];
        // 4 questions
        self.wrtiteups = [ {question : "Question1", answer : "LongAnswer"},
                        {question : "Question2", answer : "ReallyLongAnswer"}];
                        self.scholarshipMajor = "MS CS/MBA";
        scholarshipCourseDuration = 18; //in months
        tutionFee = 30000; //approxDollarAmount
        scholarships = "Other scholarships with amounts";
        filesUploaded = {"i20" : false,
                          "resume" : false,
                          "passport" : false,
                          "visa" : false,
                          "admissionLetter" : false,
                          "referenceLetter1" : false,
                          "referenceLetter2" : false,
                          "mmnaApplicationForm" : false
            };
    }
}
