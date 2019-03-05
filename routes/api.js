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
    }).then(response => {
        JSON.stringify(response.data, null, 4);
    }).then((response)=>{
        res.send(response);
    })
    .catch(function (err) {
        console.log(err);
    });
})

module.exports = router;