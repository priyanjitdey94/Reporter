const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    axios({
        method: 'get',
        url: 'https://fusioncharts.jira.com/rest/api/2/issue/createmeta',
        auth: {
            username: req.query.username,
            password: req.query.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Max-Age': 86400,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    }).catch(function (err) {
        res.send(err.data);
    });
})

router.post('/', (req, res) => {
    axios({
        method: 'post',
        url: 'https://fusioncharts.jira.com/rest/api/2/issue/bulk',
        data: req.body.issueJSON,
        auth: {
            username: req.body.username,
            password: req.body.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Max-Age': 86400,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        res.send(JSON.stringify(response.data, null, 4));
    }).catch(function (err) {
        console.log(err);
    });

});

router.get('/versions', (req, res) => {
    axios({
        method: 'get',
        url: `https://fusioncharts.jira.com/rest/api/2/project/${req.query.projKey}/versions`,
        auth: {
            username: req.query.username,
            password: req.query.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Max-Age': 86400,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(JSON.stringify(response.data, null, 4));
    }).catch(function (err) {
        console.log(err);
    });
})

router.get('/users', (req, res) => {
    axios({
        method: 'get',
        url: `https://fusioncharts.jira.com/rest/api/2/user/assignable/search?project=${req.query.projKey}`,
        auth: {
            username: req.query.username,
            password: req.query.password
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Access-Control-Max-Age': 86400,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(JSON.stringify(response.data, null, 4));
    }).catch(function (err) {
        console.log(err);
    });
})

module.exports = router;