/*
  Gets basic state (title, dates, size, extent, etc.) for all the data on geocommons.com
  Really just makes a bunch of requests to the search.json endpoint on geocommons   

*/

var limit = 100, 
  entries = []; 

var request = require('request'),
  async = require('async');

function get(url){
//queue = async.queue(function(task, cb){
  console.log(url);
  request(url, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      json = JSON.parse(data);
      if (json.entries) { 
        entries.concat(json.entries);
        console.log(json.entries.length, entries.length);
      }
      if (json.next) get(json.next);
    }
  });
}

get('http://geocommons.com/search.json?query=&page='+1+'&limit='+limit+'&mode=nonpending&sort=created&order=ascending&model=Overlay');
//queue.push({url: 'http://geocommons.com/search.json?query=&page='+1+'&limit='+limit+'&mode=nonpending&sort=created&order=ascending&model=Overlay'})

