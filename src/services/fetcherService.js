const fetcherRepo = require('../repositories/fetcherRepo');
const fetcherUtils = require('../utils/fetcherUtils');
const fetcherTransformer = require('../transformer/fetcherTransformer');

module.exports = {
    fetchStats() {
        let stats = this.getStats();
        let document = this.transformStats(stats);
        this.sendStats(document);
    },
    async getStats() {
        const stats = {
            nodeStats: {},
            indexStats: {},
            timestamp: null
        }
        stats.nodeStats = await fetcherRepo.fetchNodeStats();
        stats.indexStats = await fetcherRepo.fetchIndexStats();
        stats.timestamp = fetcherUtils.getISOTimestamp();
        return stats;
    },
    transformStats(stats) {
        return fetcherTransformer.transform(stats)
    },
    sendStats(document){
        console.log(document);
        return; 
    }
}