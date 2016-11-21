'use strict';

let fs = require('fs');
let os = require('os');
const battery = require('./node_modules/macstats/lib/battery');
let file = 'log.csv';

function logStuff() {
  let date = new Date();
  let dateStr = date.toISOString();
  let load = os.loadavg();
  let batstat = battery.getData();
  let log = [
    dateStr,
    load[0],
    load[1],
    load[2],
    batstat.current_capacity,
    batstat.max_capacity,
    batstat.charged,
    batstat.current_capacity / batstat.max_capacity
  ];

  let logMessage = log.join(',') + "\n";

  console.log(`Logging stuff: ${logMessage}`);

  fs.appendFile(file, logMessage, {}, (err) => {
    if (err) console.error('Error writing to log', err);
  })
}

logStuff();
setInterval(logStuff, 60 * 1000);