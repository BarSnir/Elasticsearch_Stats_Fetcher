const { Client } = require('@elastic/elasticsearch')
const config = require('../config.json');

module.exports = {
    client:{
        source:{},
        target:{}
    },
    getClusterConnections() {
        return this.client;
    },
    setClusterConnection(sourceHost) {
        this.client.source = new Client({
            node: sourceHost
        });
        this.client.target = new Client({
            node: config.hosts.monitor_hosts
        });
    }
}