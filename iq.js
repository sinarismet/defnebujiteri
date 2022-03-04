var app = require('express')();
var server = require('http').Server(app);
const axios = require('axios');
var FormData = require('form-data');

const port = 3000;
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
        console.log("data geldi");
        let buff = Buffer.from(b_data, 'base64');
        data = buff.toString('ascii');
        var jdata = JSON.parse(data);

        var config = {
            method: 'post',
            url: 'https://app.iqmoneytr.com/ccpayment/api/paySmart3D',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            data: data
        };
        console.log("istek yapıldı.");

        axios(config)
            .then(function (response) {
                console.log("sending pipe : " + jdata.invoice_id);
                res.setHeader('Content-Type', 'application/json');
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

