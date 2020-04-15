# Gurukul

Install project dependencies
>npm install

Run project
>npm start

Install MongoDB
Start mongo
>brew services start mongodb-community@4.2

### Secret
Secret folder contains sensitive information relating to the app
* token : generted when you first time start app and give access to the machine
* credentials : from Google Sheets API
* Constants : Speciual constants like SpreadSheetID

# TODO

## MileStone 1
* Get Data from Google sheet <span style="color:green">DONE</span>
* populate local database
* Everytime sheet is updated or new record is added; add/updadte record in local database also <span style="color:orange">DROPPED</span>

## MileStone 2
* Get filtered data
* Add data to existing record

## MileStone 3
* Normalize MongoDB data <span style="color:green">DONE</span>
* provide suggestions to relate

## Mongo
* DeprecationWarning : useUnifiedTopology

## Misc
* Move secrets to seperate folder
* .gitignore
* Dev dependencies vs run dependencies
* eslint rules
* Doc for GoogleSheets and MongoDBO
* Validation on inputs (if needed)
* Do not print stacktrace. Hide code; give useful message

# Queries

* See all applicants for the quater (pending applicants from prev quaters)
  * Name
  * Application Status
  * Application Status Date
  * Contact Phone
  * Contact Email
  * Assiatance Quater
  * Duration of Course
  * College Name
  * Reference 1 Name
  * Reference 2 Name
  * Notes
* See specific application
  * All details
  * Application Status
  * Referral Status
  * Notes
* Repayment applications for year/quater or before
  * Name
  * Contact Phone
  * Email
  * Date Amount Give
  * Scholarship Given
  * Scholarship Pending
  * Notes
  * Contact After
  * Reference 1 Name
  * Reference 2 Name

