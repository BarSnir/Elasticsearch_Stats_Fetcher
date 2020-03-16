const ElasticSearch = require('@elastic/elasticsearch');
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
        this.client.source = new ElasticSearch({
            node: sourceHost
        });
        this.client.target = new ElasticSearch({
            node: config.hosts.monitor-hosts
        });
    }
}