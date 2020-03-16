const fetcherConnector = require('../connectors/fetcherConnector');

module.exports = {
    fetchNodeStats() {
        let client = fetcherConnector.getClusterConnections();
        return client.source.nodes.stats();
    },
    fetchIndicesStats() {
        let client = fetcherConnector.getClusterConnections();
        return client.source.indices.stats()
    },
    sendStats(){

    }
}