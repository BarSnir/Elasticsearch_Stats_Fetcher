const fetcherConnector = require('../connectors/fetcherConnector');

module.exports = {
    fetchNodeStats() {
        client = fetcherConnector.getClusterConnections();
        return client.source.nodes.stats();
    },
    sendStats(){

    }
}