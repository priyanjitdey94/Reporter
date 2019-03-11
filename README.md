# Automated JIRA Reporter

Automate the issue reporting process on JIRA.

### Setup

`node server.js`
`cd client`
`npm start`

### Input format in CSV
* `Issue type`: Describe the type of issue. The input should be same as in JIRA(For example, Bug is correct. bUg is not)
* `Priority`: Defined priority of the issue. [`Blocker`, `Critical`, `Major`, `Minor`, `Trivial`]
* `Affect versions`: Provide the affect versions.
* `Summary`: Title of the issue.
* `Description`: Description of the issue.
* `Test data`: JSON data to be tested with.
* `Assignee`: Name of the assignee.

### Limitations
* Direct login option from google sheets is not done yet. CSV file needs to be updated manually.
* No option to update an already logged issues.
* Adding attachments to issues before logging is implemented as of know.

### Known bugs
* Issue does not get logged when issue type is changed in some cases.

### License
This project is under the [MIT](https://opensource.org/licenses/MIT) license. 