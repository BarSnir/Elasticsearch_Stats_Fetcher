const fetcherRepo = require('../repositories/fetcherRepo');
const fetcherDocBuilder = require('../builders/docBuilders');
const fs = require('fs');

module.exports = {
    async fetchStats() {
        let stats = await this.getStats();
        let documents = this.buildDocs(stats);
        let bulk = this.buildBulk(documents);
        this.sendStats(bulk);
    },
    async getStats() {
        let stats = {
            nodeStats: {},
            indexStats: {}
        } 
        stats.nodeStats =  await fetcherRepo.fetchNodeStats();
        stats.indexStats = await fetcherRepo.fetchIndexStats();
        return stats;
    },
    buildDocs(stats){
        return fetcherDocBuilder.buildDocs(stats);
    },
    buildBulk(documents){
        return fetcherDocBuilder.buildBulk(documents);
    },
    sendStats(document){
        fetcherRepo.sendStats(document); 
    }
}