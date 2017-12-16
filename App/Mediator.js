'use strict';

class Mediator
{
    constructor(){
        this.workers = {};
    }

    register() {
        for (var i = 0; i < arguments.length; i++) {
            this.workers[arguments[i].name] = arguments[i];
            arguments[i].mediator = this;
        }
    }

    send(message, from, to){
        if (to) {
            to.receive(message, from);
        } else {
            //implement broadcast
        }
    }
    
}

module.exports = new Mediator();
