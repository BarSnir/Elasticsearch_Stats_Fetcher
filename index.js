const express = require('express');
const elasticsearch = require('@elastic/elasticsearch');
const waterfall = require('async-waterfall');
const esClientSource = new elasticsearch.Client({
    nodes: 'http://10.0.0.59:9200'
});
// const esClientTarget = new elasticsearch.Client({
//     host: 'localhost:9200'
// });


const i = setInterval(()=>{
    waterfall([
        async function(callback){
          callback(null, await esClientSource.nodes.stats())
        },
        function(payload, callback){
          console.log(payload);
          callback(null, 'three');
        }
      ], function (err, result) {
        // result now equals 'done'
    });
},10000)
