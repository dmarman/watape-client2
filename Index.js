'use strict';

const manager = require('./App/Workers/Manager.js');
const communicator = require('./App/Workers/Communicator.js');
const downloader = require('./App/Workers/Downloader.js');
const recorder = require('./App/Workers/Recorder.js');
const uploader = require('./App/Workers/Uploader.js');
const mediator = require('./App/Mediator.js');

mediator.register(manager, communicator, uploader, downloader, recorder);
// console.log(downloader);

communicator.getTasks().then((tasks) => {
    
    manager.assign(tasks);
    downloader.work();
    recorder.work();

});

