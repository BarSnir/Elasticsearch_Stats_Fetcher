const fetcherRepo = require('../repositories/fetcherRepo');
const fetcherUtils = require('../utils/fetcherUtils');
const fetcherTransformer = require('../transformer/fetcherTransformer');
const deltaUtils = require('../utils/deltaUtils');

module.exports = {
    prevStats: null,
    async fetchStats() {
        let stats = await this.getStats();
        let document = this.transformStats(stats);
        this.sendStats(document);
        this.prevStats = document;
    },
    async getStats() {
        let stats = {
            nodeStats: {},
            indexStats: {},
            timestamp: null
        }
        stats.nodeStats =  await fetcherRepo.fetchNodeStats();
        stats.indexStats = await fetcherRepo.fetchIndexStats();
        stats.timestamp = fetcherUtils.getISOTimestamp();
        stats = this.getDeltaInfo(stats)
        return stats;
    },
    getDeltaInfo(stats) {
        if(!this.prevStats) {
            return false;
        }
        stats.nodeStats = deltaUtils.getNodeDeltas(stats.nodeStats, this.prevStats);
        stats.indexStats = deltaUtils.getIndicesDelta(stats.indexStats , stats.indexStats);
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