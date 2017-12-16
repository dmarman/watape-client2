'use strict';

class Worker
{
    constructor(name)
    {
        this.name = name;
        this.mediator = null;
    }

    send(message, to)
    {
        this.mediator.send(message, this, to);
    }

    receive(message, from)
    {
        console.log(message, 'from ' + from.name, 'to ' + this.name);
    }
}

module.exports = Worker;
