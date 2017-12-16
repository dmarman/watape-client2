'use strict';

const fs = require('fs');
const axios = require('axios');
const Worker = require('./Worker.js');

class Downloader extends Worker
{
    constructor(name)
    {
        super(name);
        this.tasks = [];
    }

    receive(task, from)
    {
        console.log('recieved: ', task.track.id);

        this.tasks.push(task);
    }

    work()
    {
        console.log('downloader working: -', this.tasks.length);
        let task = this.tasks.shift();
        this.download(task.track).then(() => {
            this.send(task, this.mediator.workers.Recorder);
            if(this.tasks.length > 0){
                this.work();
            }
        });

        //UpdateDatabase();
        // flush(this.tasks)
    }

    download(track)
    {
        console.log('downloading: ', track.id);

        var url  	= 'http://localhost/laravel/taptapo/public/api/track/download/' + track.id;
        var method	= 'GET';

        return axios({url: url, method: method, headers: {'api-token': 'qbmETutuPqRxqcfIrPSVXGhWqRF1D3DJeLht5wTl'}, responseType: 'stream'})
            .then((response) => {
                console.log('downloaded: ', track.id);
                this.store(track, response.data);
            })
            .catch(function (error) {
                console.log('Could not download track');
                console.log(error);
            });
    }

    store(track, file){
        fs.writeFileSync('Storage/Tracks/' + track.name, file);
        console.log('Stored: ', track.id);
    }
    
}

module.exports = new Downloader('Downloader');
