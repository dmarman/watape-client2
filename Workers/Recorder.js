'use strict';

const Worker = require('./Worker.js');

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
            console.log('promiseeeee');
            return resolve();
        });
    }

}

module.exports = new Recorder('Recorder');
