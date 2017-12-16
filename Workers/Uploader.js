'use strict';

const Worker = require('./Worker.js');

class Uploader extends Worker
{
    constructor(name)
    {
        super(name);
    }

    receive(task, from)
    {
        console.log(task.id, task.status, 'from ' + from.name, 'to ' + this.name);
    }
    
}

module.exports = new Uploader('Uploader');
