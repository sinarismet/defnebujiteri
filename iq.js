var app = require('express')();
var server = require('http').Server(app);
const axios = require('axios');
var FormData = require('form-data');

const port = 3001;
server.listen(port);
const iqmoney_base_url = "https://app.iqmoneytr.com/ccpayment/";
const iqmoney_3d_pay_url = "api/paySmart3D";

console.log("listening on : " + port);

app.post('/iq/create', function (request, res, next) {
    try {
        var b_data = request.query.b_data;
        var token = request.query.token;
    } catch (e) {
        res.end("error" + e);
    }
    let data = "";
    try {
        
        let buff = Buffer.from(b_data, 'base64');
        data = buff.toString('utf8');
        console.log(data);
        var jdata = JSON.parse(data);
        var config = {
            method: 'post',
            url: 'https://app.iqmoneytr.com/ccpayment/api/paySmart3D',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json;charset=utf-8',
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log("sending pipe : " + jdata.invoice_id);
                res.setHeader('Content-Type', 'application/json;charset=utf-8');
                res.end(response.data);
            })
            .catch(function (error) {
                console.log(error);
                res.end();
            });
    }
    catch (e) {
        console.log("UPS:.." + e);
        res.end();
    }
});
