'use strict';

const axios = require('axios');
const Worker = require('./Worker.js');

class Communicator extends Worker
{
    constructor(name)
    {
        super(name);
    }

    receive(message, from)
    {
        console.log(message, 'from ' + from.name, 'to ' + this.name);
    }

    getTasks()
    {
        const url = 'http://localhost/laravel/taptapo/public/api/queue';
        const method = 'GET';

        return axios({url: url, method: method, headers: {'api-token': 'qbmETutuPqRxqcfIrPSVXGhWqRF1D3DJeLht5wTl'}})
            .then((response) => {
                return response.data.data;
            })
            .catch(function (error) {
                console.log('Could not get first of queue of ' + listName);
                console.log(error);
            });
    }
}

module.exports = new Communicator('Communicator');
