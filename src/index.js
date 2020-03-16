const express = require('express');
const fetcherConnector = require('./connectors/fetcherConnector');
const fetcherService = require('./services/fetcherService')
process.env['host'] = 'http://10.0.0.59:9200'

fetcherConnector.setClusterConnection(process.env.host);

const i = setInterval(() => {
    fetcherService.fetchStats();
},10000);