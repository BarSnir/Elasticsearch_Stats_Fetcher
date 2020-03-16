const fetcherExecutor = require('../executors/fetcherExecutor');

module.exports = {
    fetchNodeStats() {
        return fetcherExecutor.fetchNodeStats();
    },
    fetchIndexStats() {
        return fetcherExecutor.fetchIndicesStats();
    }
}