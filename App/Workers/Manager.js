'use strict';

const Worker = require('./Worker.js');

class Manager extends Worker
{
    constructor(name)
    {
        super(name);
    }

    receive(message, from)
    {
        console.log(message, 'from ' + from.name, 'to ' + this.name);
    }

    assign(tasks){
        tasks.map((task) => {
            if(task.status == 'waiting'){
                this.send(task, this.mediator.workers.Downloader);
            } else if (task.status == 'downloaded') {
                this.send(task, this.mediator.workers.Recorder);
            } else if (task.status == 'recorded') {
                this.send(task, this.mediator.workers.Uploader);
            }
        });
    }
}

module.exports = new Manager('Manager');
