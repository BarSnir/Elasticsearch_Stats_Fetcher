const express = require('express');
const fetcherConnector = require('./connectors/fetcherConnector');
process.env['host'] = 'http://10.0.0.59:9200'

fetcherConnector.setClusterConnection(process.env.host);

const i = setInterval(() => {

},10000);