'use strict';

const Worker = require('./Worker.js');
const Soundcard = require('../Soundcard.js');
const fs = require('fs');

class Recorder extends Worker
{
    constructor(name)
    {
        super(name);
        this.tasks = [];
    }

    receive(task, from)
    {
        this.tasks.push(task);

        console.log(task.id, task.status, 'from ' + from.name, 'to ' + this.name);
    }

    work()
    {
        console.log('recorder working: -', this.tasks.length);
        let task = this.tasks.shift();
        this.record(task.track).then(() => {
        //    this.send(task, this.mediator.workers.Recorder);
            if(this.tasks.length > 0){
                this.work();
            }
        });

        //UpdateDatabase();
        // flush(this.tasks)
    }

    record(track)
    {
        return new Promise((resolve, reject) => {
            let writeableStream = fs.createWriteStream('./App/Records', 'test.wav');
            const soundcard = new Soundcard();
            //let player = soundcard.play(track);
            let audioStream = soundcard.record();
            
            audioStream.pipe(writeableStream);
            // audioStream.on('data', (buffer) => {

                  // data = buffer;
                // console.log(buffer);
                // for (var i = 0, n = buffer.length; i < n; i++) {
                    // console.log(buffer[i]);
                // }
                // console.log(buffer.length);

                // console.log(track.name, chunk);
            // });

            setTimeout(() => {
                soundcard.stopRecording();
                return resolve();
            }, 2000);

        });
    }

}

module.exports = new Recorder('Recorder');
