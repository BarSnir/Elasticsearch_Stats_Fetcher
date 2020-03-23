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
    async sendStats(stats){
        let client = fetcherConnector.getClusterConnections();
        await client.target.index({
            index: `index-g1-monitor`,
            body: stats
        });
        console.log('logs sent');
    }
}