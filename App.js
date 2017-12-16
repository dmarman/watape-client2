'use strict';

const manager = require('./Workers/Manager.js');
const communicator = require('./Workers/Communicator.js');
const downloader = require('./Workers/Downloader.js');
const recorder = require('./Workers/Recorder.js');
const uploader = require('./Workers/Uploader.js');
const mediator = require('./Mediator.js');

mediator.register(manager, communicator, uploader, downloader, recorder);
// console.log(downloader);

communicator.getTasks().then((tasks) => {
    
    manager.assign(tasks);
    downloader.work();
    recorder.work();

});

