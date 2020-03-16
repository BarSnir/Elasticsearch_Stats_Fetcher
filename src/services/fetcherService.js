const fetcherRepo = require('../repositories/fetcherRepo');
const fetcherUtils = require('../utils/fetcherUtils');
const fetcherTransformer = require('../transformer/fetcherTransformer');
const deltaUtils = require('../utils/deltaUtils');
const fs = require('fs');

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
        fs.writeFileSync('nodeStats.json', JSON.stringify(stats.nodeStats, null, 2))
        fs.writeFileSync('indexStats.json', JSON.stringify(stats.indexStats, null, 2))
        stats = this.getDeltaInfo(stats) || stats;
        return stats;
    },
    getDeltaInfo(stats) {
        if(!this.prevStats) {
            return false;
        }
        let prevNodeStats = this.prevStats.nodeStats;
        let prevIndexStats = this.prevStats.indexStats;
        stats.nodeStats = deltaUtils.getNodeDeltas(stats.nodeStats, prevNodeStats);
        stats.indexStats = deltaUtils.getIndicesDelta(stats.indexStats , prevIndexStats);
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