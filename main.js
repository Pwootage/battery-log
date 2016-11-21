'use strict';

let fs = require('fs');
let os = require('os');
let file = 'log.csv';

function logStuff() {
  let date = new Date();
  let dateStr = date.toISOString();
  let load = os.loadavg();
  let stats = require('macstats');
  let log = [
    dateStr,
    load[0],
    load[1],
    load[2],
    stats.battery.current_capacity,
    stats.battery.max_capacity,
    stats.battery.charged,
    stats.battery.current_capacity / stats.battery.max_capacity
  ];

  let logMessage = log.join(',') + "\n";

  console.log(`Logging stuff: ${logMessage}`);

  fs.appendFile(file, logMessage, {}, (err) => {
    if (err) console.error('Error writing to log', err);
  })
}

logStuff();
setInterval(logStuff, 60 * 1000);