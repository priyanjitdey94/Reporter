# Automated JIRA Reporter

Automate the issue reporting process on JIRA.

### Setup

`node server.js
 cd client
 npm start`

 ### Input format in CSV
 * `Issue type`: Describe the type of issue. The input should be same as in JIRA(For example, Bug is correct. bUg is not)
 * `Priority`: Defined priority of the issue. [`Blocker`, `Critical`, `Major`, `Minor`, `Trivial`]
 * `Affect versions`: Provide the affect versions.
 * `Summary`: Title of the issue.
 * `Description`: Description of the issue.
 * `Test data`: JSON data to be tested with.
 * `Assignee`: Name of the assignee.