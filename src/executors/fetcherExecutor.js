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
    async sendStats(documents){
        let client = fetcherConnector.getClusterConnections();
        await client.target.bulk({
            refresh: true,
            body: documents
        });
        console.log('logs sent');
    }
}