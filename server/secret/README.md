This folder contains some secret keys and configuration to your application.

Each of the files are described as below:


# config.json

```json
{
    "GoogleSheets": {
        "id": <SPREADSHEET_ID_OF_GOOGLE_SHEET>,
        "range": <DATA_RANGE_FROM_SPREADSHEET>
    },
    "mLab": {
        "uri": <CONNECTION_STRING_TO_DATABSE>
    }
}
```

# credentials.json

Contains application key you acquire from google

Credetials allows your application to use Spreadsheets API


# token.json

When you first login, token is generated to ensure access to spreadsheet.

The token is automatically copied to this folder when you enter it on command line.

Just follow the instructions on console when  you first start up the server
